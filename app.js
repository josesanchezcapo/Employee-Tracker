// adding depentencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// database connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Sql01!!??',
    database: 'employee_tracker'
});

// testing connection
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });