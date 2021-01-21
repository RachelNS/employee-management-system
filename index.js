const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
const allEmp = require("./allEmp.js");
// const addEmp = require("./addEmp.js");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_management"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function start() {

    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
    }]).then(response => {
        switch(response.action) {
            case "View All Employees":
                allEmp.allEmp();
                break;
            case "View All Employees By Department":
                console.log("department my dude");
                break;
            case "View All Employees By Manager":
                console.log("manager my dude");
                break;
            case "Add Employee":
                console.log("adding employee");
                break;
            case "Remove Employee":
                console.log("removing employee");
                break;
            case "Update Employee Role":
                console.log("updating employee role");
                break;
            case "Update Employee Manager":
                console.log("updating employee manager");
                break;
            case "Exit":
                console.log("Bye");
                break;
        }
    })


};

start();



   





