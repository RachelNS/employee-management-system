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

function empByMgm() {
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
                name: "manager",
                message: "Please select a manager.",
                choices: emp
            }]).then(({ manager }) =>
                connection.query(
                    "SELECT * FROM employee WHERE manager_id= ?", [manager], (err, res) => {
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

module.exports = { empByMgm };