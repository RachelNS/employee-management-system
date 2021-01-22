// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// Connect to the employee_management database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_management"
});

connection.connect(function (err) {
    if (err) throw err;
});

function addEmp() {
    
    connection.query(
        "SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN departments ON role.department_id = departments.id", (err, res) => {
            if (err) throw err;
            // Grab name and id of all employees and push them into manager array
            const manager = [];
            const role = [];

            for (i = 0; i < res.length; i++) {
                role.push({
                    name: `${res[i].title}`,
                    value: `${res[i].role_id}`
                })
            };

            for (i = 0; i < res.length; i++) {
                manager.push({
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: `${res[i].id}`
                })
            };
            // Ask user which employee to delete
            inquirer.prompt([
                {
                    type: "input",
                    name: "first",
                    message: "What is this employee's first name?"
                },
                {
                    type: "input",
                    name: "last",
                    message: "What is this employee's last name?"
                },
                {
                    type: "list",
                    name: "job",
                    message: "What is this employee's role?",
                    choices: role
                },
                {
                type: "list",
                name: "boss",
                message: "Who is this employee's manager?",
                choices: manager
            }]).then((response) => {
                connection.query(
                    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.first}", 
                    "${response.last}", ${parseInt(response.job)}, ${parseInt(response.boss)})`, (err, res) => {
                        if(err) throw err;
                    }
                    
                )

            })

        }
    );
}

module.exports = {addEmp};