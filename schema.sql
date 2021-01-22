DROP DATABASE IF EXISTS employee_management;
CREATE DATABASE employee_management;
USE employee_management;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10.00) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);

SELECT * FROM employee
JOIN role ON employee.role_id = role.id
JOIN departments ON role.department_id = departments.id;

INSERT INTO departments (name)
VALUES ("Accounting");
INSERT INTO departments (name)
VALUES ("Fun");
INSERT INTO departments (name)
VALUES ("Engineering");
INSERT INTO departments (name)
VALUES ("Chaos");

INSERT INTO role (title, salary, department_id)
VALUES ("Finance Manager", 100000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Fun Manager", 200000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineering Manager", 100000.00, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Chaos Manager", 500000.00, 4);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Whocares", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Derek", "Istheworst", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melina", "Markland", 1, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Wanda", "Sykes", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Colin", "Robinson", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Helen", "Kress", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Karen", "Lastname", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("The", "Cat", 4);



SELECT * FROM departments;

SELECT * FROM role;

SELECT * FROM employee;
