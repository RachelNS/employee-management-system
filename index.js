// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
const allEmp = require("./allEmp.js");
const addEmp = require("./addEmp.js");
const remEmp = require("./remEmp");
const empByDept = require("./empByDept");
const updateMgm = require("./updateMgm");
const updateRole = require("./updateRole");
const empByMgm = require("./empByMgm");

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
                allEmp.allEmp();
                break;
            case "View All Employees By Department":
                empByDept.empByDept();
                break;
            case "View All Employees By Manager":
                empByMgm.empByMgm();
                break;
            case "Add Employee":
                addEmp.addEmp();
                break;
            case "Remove Employee":
                remEmp.remEmp();
                break;
            case "Update Employee Role":
                updateRole.updateRole();
                break;
            case "Update Employee Manager":
                updateMgm.updateMgm();
                break;
            case "Exit":
                console.log("Bye");
                connection.end();
                break;
        }
    })};




start();



   





