const mysql = require("mysql");
const start = require("./index.js");

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
    console.log("connected as id " + connection.threadId + "\n");
});

// Display all entries in the employees table
function allEmp() {
    connection.query(
        "SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            console.table(res);
            start.start();
        }
    )
};

allEmp();
module.exports = {allEmp};