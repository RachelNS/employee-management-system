// Dependencies
const mysql = require("mysql");
const table = require("console.table");
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
    // console.log("connected as id " + connection.threadId + "\n");
});


function remEmp() {

    connection.query(
        "SELECT first_name, last_name, id FROM employee", (err, res) => {
            if (err) throw err;

            console.log(res);
            const toDelete = [];
            for(i=0; i<res.length; i++) {
                toDelete.push({
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: `${res[i].id}`
                })
            };
            inquirer.prompt([{
                type: "list",
                name: "bye",
                message: "Which employee would you like to remove?",
                choices: toDelete
            }]).then(({bye}) => {
                connection.query(
                    "DELETE FROM employee WHERE id =?", [bye], (err, res) => {
                        if(err) throw err;
                    }
                )
            })



        }
    );



    
}

module.exports = {remEmp};