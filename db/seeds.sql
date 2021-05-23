INSERT INTO department (name)
VALUES 
('General Management'),
('Marketing'),      
('Operations'),
('Finance'),
('Sales'),
('IT'),
('HR');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', 85000, 1),
('Project manager', 85000, 1),
('Marketing specialist', 70000, 2),
('Business analyst', 75000, 5),
('HR personnel', 65000, 7),
('Accountant', 66000, 4),
('Sales representative', 60000, 5),
('Administrative assistant', 62000, 1),
('Customer Service representative', 55000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Austin', 'Greene', 1, 2),
('Christopher', 'Randall', 1, 2),
('Charles', 'Peters', 2, 1),
('Olivia', 'Anderson', 3, 2),
('Virginia', 'Stewart', 4, 2),
('Max', 'Taylor', 5, 1),
('Eric', 'Underwood', 6, 1),
('Sarah', 'Rampling', 7, 1),
('Michael', 'Walsh', 8, 1),
('Dorothy', 'Smith', 9, 2),
('Anna', 'Avery', 7, 1),
('Chloe', 'Paterson', 6, 1),
('Elizabeth', 'Bell', 8, 2),
('Rachel', 'Simpson', 9, 2),
('Rachel', 'Chapman', 7, 1);

