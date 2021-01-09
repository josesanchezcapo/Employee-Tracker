// adding depentencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { exclude } = require("inquirer/lib/objects/separator");
const Choices = require("inquirer/lib/objects/choices");

// database connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Sql01!!??',
    database: 'employee_tracker'
});

// open connection
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    // Testing - console.log('Connected to the MySQL server.');
    
  });

  function mainMenu(){

    inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'Employee Tracker : Main Menu',
      Choices: [
        'all employees',
        'View all employees by role',
        'View all employees by department',
        'View all employees by manager',
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Update employee manager",
        "Delete employee",
        "Delete role",
        "Delete department",
        "View department budgets"
      ]
      
    }) .then((responses) => {


    })
  }

