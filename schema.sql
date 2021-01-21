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

INSERT INTO departments (name)
VALUES ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Finance Manager", 100000.00, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Whocares", 1);

SELECT * FROM departments;

SELECT * FROM role;

SELECT * FROM employee;
