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

// Fetch all entiries in employee table
function updateRole() {
    connection.query(
        "SELECT * FROM employee JOIN role ON employee.role_id = role.id", (err, res) => {
            if (err) throw err;
            // Pull out the name and id values in both employee and role and push them into the emp and role arrays
            const emp = [];
            const role = [];
            for (i = 0; i < res.length; i++) {
                emp.push({
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: `${res[i].id}`
                })
            };

            for (i = 0; i < res.length; i++) {
                role.push({
                    name: `${res[i].title}`,
                    value: `${res[i].role_id}`
                })
            };

            // Take user input and update the selected employee's role to match the corresponding role id on the role table
            inquirer.prompt([{
                type: "list",
                name: "emp",
                message: "Which employee would you like to update?",
                choices: emp
            },
            {
                type: "list",
                name: "role",
                message: "What should the new role be?",
                choices: role
            }]).then(response => {
                console.log(response);
                connection.query(
                    `UPDATE employee SET role_id = ${response.role} WHERE id = ${response.emp}`, (err, res) => {
                        if(err) throw err;
                        console.table(res);
                    }
                )
            })


        }
    )
}

// Export for index.js dependencies
module.exports = {updateRole};