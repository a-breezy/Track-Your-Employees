INSERT INTO department(name)
VALUES
    ('management'),
    ('engineering'),
    ('book-keeping');

INSERT INTO role (title, salary, department_id)
VALUES
    ('manager', 50000, 1),
    ('engineer', 60000, 2),
    ('accountant', 40000, 3),
    ('intern', 25000, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('mark', 'landis', 1, NULL),
    ('marie', 'hobbs', 2, 1),
    ('henry', 'mindsfield', 4, 1),
    ('susie', 'rondy', 3, 1),
    ('tiffany', 'wendles', 1, NULL),
    ('anthony', 'grendles', 4, 5),
    ('janny', 'manny', 2, 5),
    ('roberto', 'kern', 3, 5),
    ('herbert', 'hertz', 1, NULL)