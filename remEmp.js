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

function remEmp() {
    connection.query(
        "SELECT first_name, last_name, id FROM employee", (err, res) => {
            if (err) throw err;
            // Grab name and id of all employees and push them into toDelete array
            const toDelete = [];
            for (i = 0; i < res.length; i++) {
                toDelete.push({
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: `${res[i].id}`
                })
            };
            // Ask user which employee to delete
            inquirer.prompt([{
                type: "list",
                name: "bye",
                message: "Which employee would you like to remove?",
                choices: toDelete
            }]).then(({bye}) => {
                connection.query(
                    "DELETE FROM employee WHERE id =?", [bye], (err, res) => {
                        if (err) throw err;
                    }
                )
            })

        }
    );

}

// Export for index.js dependencies
module.exports = { remEmp };