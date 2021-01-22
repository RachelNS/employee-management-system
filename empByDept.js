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

// Fetch all entries in the departments table
function empByDept() {
    connection.query(
        "SELECT * FROM departments", (err, res) => {
            if (err) throw err;
            // Pull out the name and id values and push them into the dept array
            const dept = [];
            for (i = 0; i < res.length; i++) {
                dept.push({
                    name: `${res[i].name}`,
                    value: `${res[i].id}`
                })
            };
            // Take user input and display all employees whose role id corresponds to a role in the selected department
            inquirer.prompt([{
                type: "list",
                name: "department",
                message: "Please select a department.",
                choices: dept
            }]).then(department =>
                connection.query(
                    "SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN departments ON role.department_id = departments.id WHERE departments.id = ?", [department.department], (err, res) => {
                        if (err) throw err;
                        for (i = 0; i < res.length; i++) {
                            console.log(`${res[i].first_name} ${res[i].last_name}`);
                        }

                    }

                )
            )

        }

    )


}

// Export for index.js dependencies
module.exports = { empByDept };