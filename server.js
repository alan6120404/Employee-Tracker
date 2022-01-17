const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        //Your MySQL password,
        password: '',
        database: 'business'
    },
    console.log('Connected to the business database.')
);

// Default response for any request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// prompt user
const promptUser = () => {
    return inquirer.prompt({
                type:'list',
                name:'toDo',
                message: 'What would you like to do?',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
                
            })
            .then(({ toDo }) => {
                switch (toDo) {
                    case 'view all departments':
                        db.query(`SELECT * FROM department`, (err, rows) => {
                            console.table(rows)
                            return promptUser();
                        });
                        break;
                    case 'view all roles':
                        db.query(`SELECT * FROM roles`, (err, rows) => {
                            console.table(rows)
                            return promptUser();
                        });
                        break;
                    case 'view all employees':
                        db.query(`SELECT * FROM employee`, (err, rows) => {
                            console.table(rows)
                            return promptUser();
                        });
                        break;
                    case 'add a department':
                        return inquirer.prompt({
                            type:'text',
                            name:'addDep',
                            message: 'What is the name of the department?'
                            })
                            .then(({ addDep }) => {
                                db.query(`INSERT INTO department (dep_name)
                                VALUES (?)`, [ addDep ], (err, result) => {
                                    console.log(addDep + ' department is successfully added!');
                                    return promptUser();
                            })

                        });
                        break;
                    case 'add a role':
                        return inquirer.prompt([
                            {
                            type:'text',
                            name:'role',
                            message: 'What is the name of the role?'
                            },
                            {
                            type:'text',
                            name:'salary',
                            message: 'What is the salary of the role?'
                            },
                            {
                            type:'text',
                            name:'id',
                            message: 'What is the department id of the role?'
                            }

                        ])
                            .then(roleData => {
                                db.query(`INSERT INTO roles (title, salary, department_id)
                                VALUES (?,?,?)`, [roleData.role, roleData.salary, roleData.id], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    return promptUser();
                                    });
                                });
                        break;
                    case 'add an employee':
                        return inquirer.prompt([
                            {
                            type:'text',
                            name:'first_name',
                            message: "What is the employee's first name?"
                            },
                            {
                            type:'text',
                            name:'last_name',
                            message: "What is the employee's last name?"
                            },
                            {
                            type:'text',
                            name:'role',
                            message: "What is the employee's role id?"
                            },
                            {
                            type:'text',
                            name:'manager',
                            message: "What is the employee's employee's manager id?"
                            }
                        ])
                            .then(employeeData => {
                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES (?,?,?,?)`, [employeeData.first_name, employeeData.last_name, employeeData.role, employeeData.manager], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log('Added ' + employeeData.first_name + ' ' + employeeData.last_name + ' to the database');
                                    return promptUser();
                                    });
                                });
                        break;
                    case 'update an employee role':
                        return inquirer.prompt([
                            {
                            type:'text',
                            name:'employee',
                            message: "Which employee ID's role would you want to update?"
                            },
                            {
                            type:'text',
                            name:'id',
                            message: "What is the employee's new role id?"
                            }
                        ])
                            .then(employeeData => {
                                db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [employeeData.employee, employeeData.id], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log('Updated employee ID ' + employeeData.employee + ' to the role ID ' + employeeData.id + '.');
                                    return promptUser();
                                    });
                                });
                        break;
                }
            })
}

promptUser();