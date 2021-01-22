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

function updateMgm() {
    connection.query(
        "SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            const emp = [];
            for (i = 0; i < res.length; i++) {
                emp.push({
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: `${res[i].id}`
                })
            };
            inquirer.prompt([{
                type: "list",
                name: "emp",
                message: "Which employee would you like to update?",
                choices: emp
            },
            {
                type: "list",
                name: "manager",
                message: "Who should the new manager be?",
                choices: emp
            }]).then(response => {
                connection.query(
                    `UPDATE employee SET manager_id = ${response.manager} WHERE id = ${response.emp}`, (err, res) => {
                        if(err) throw err;
                        console.table(res);
                    }
                )
            })

        }

    )
}



module.exports = {updateMgm};