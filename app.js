// adding depentencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// database connection 
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Sql01!!??',
  database: 'employee_tracker'
});

// open connection
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
});

// main menu

console.log('\n EMPLOYEE TRACKER \n');

const mainMenu = function () {
  inquirer.prompt([
    {

      type: 'list',
      name: 'menuChoises',
      message: 'Employee Tracker : Main Menu',
      choices: [
        'View all employees',
        'View all department',
        'View all roles',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update employee roles',
      ]
    }
  ]).then((responses) => {

    switch (responses.menuChoises) {
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'View all department':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'Add Department':
        addDepartment();
        break;
    }

  });

  function viewAllEmployees() {

    const query = "SELECT " +
      "employee.id AS 'Employee Id', " +
      "employee.first_name  AS 'First Name', " +
      "employee.last_name AS 'Last Name', " +
      "IFNULL(role.title, ' ') AS 'Title', " +
      "IFNULL(CONCAT(emp.first_name, ' ' ,emp.last_name),' ') AS 'Manager' " +
      "FROM employee " +
      "LEFT JOIN role on employee.role_id =  role.id " +
      "LEFT JOIN employee as emp on employee.id = emp.manager_id;"

    connection.query(query, function (err, res) {
      if (err) return err;
      console.log("\n");
      console.table(res);
      mainMenu();

    });
  };

  function viewAllDepartments() {

    const query = "SELECT id AS 'Department ID', departmentName AS 'Department Name' FROM department;"

    connection.query(query, function (err, res) {
      if (err) return err;
      console.log("\n");
      console.table(res);
      mainMenu();

    });

  };

  function viewAllRoles() {

    const query = "SELECT role.id AS 'Role Id' , role.title as Title," +
      "CONCAT('$', FORMAT(role.salary, 2)) AS Salary, department.departmentName AS 'Department Name' " +
      "FROM role " +
      "LEFT JOIN department ON role.department_id = department.id;"

    connection.query(query, function (err, res) {
      if (err) return err;
      console.log("\n");
      console.table(res);
      mainMenu();

    });

  };

  function addDepartment() {
      inquirer.prompt([
        {
          type: 'input',
          name: 'newDepartment',
          message: 'Please enter the department Name'
        }
      ]).then((response) => {

        connection.query("INSERT INTO department SET ?",
          {
            departmentName: response.newDepartment
          },
          function (err, res) {
            if (err) return err;
            console.clear();
            console.log("Department added")
          });
        viewAllDepartments();
        mainMenu();
      });
    };
  };

mainMenu();
