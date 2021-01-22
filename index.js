// Dependencies
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
const allEmp = require("./allEmp.js");
// const addEmp = require("./addEmp.js");
const remEmp = require("./remEmp");

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

// Ask user what they would like to do
function start() {

    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
    }]).then(({action}) => {

        // Call different functions based on response
        switch(action) {
            case "View All Employees":
                allEmp();
                break;
            case "View All Employees By Department":
                console.log("department my dude");
                break;
            case "View All Employees By Manager":
                console.log("manager my dude");
                break;
            case "Add Employee":
                console.log("adding employee my dude");
                break;
            case "Remove Employee":
                remEmp.remEmp();
                break;
            case "Update Employee Role":
                console.log("updating employee role my dude");
                break;
            case "Update Employee Manager":
                console.log("updating employee manager my dude");
                break;
            case "Exit":
                console.log("Bye");
                connection.end();
                break;
        }
    })


};

start();



   





