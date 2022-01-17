INSERT INTO department (dep_name)
VALUES
    ('Accounting'),
    ('Human Resource'),
    ('Marketing'),
    ('Advertising'),
    ('Strategy'),
    ('Operations');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Recruiter', 60000, 2),
    ('Accountant', 70000, 1),
    ('Marketing Specialist', 100000, 3),
    ('Operations Manager', 50000, 6),
    ('Ad Ops Specialist', 79000, 4),
    ('Operator', 22000, 6),
    ('Strategist', 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 2, NULL),
    ('Virginia', 'Woolf', 3, NULL),
    ('Piers', 'Gaveston', 5, NULL),
    ('Charles', 'LeRoi', 4, NULL),
    ('Katherine', 'Mansfield', 1, NULL),
    ('Dora', 'Carrington', 6, 4),
    ('Edward', 'Bellamy', 6, 4),
    ('Montague', 'Summers', 2, NULL),
    ('Octavia', 'Butler', 7, NULL),
    ('Unica', 'Zurn', 6, 4);
