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
        'Update employee role',
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
      case 'Add Role':
        addRole();
        break;

      case 'Add Employee':
        addEmployee();
        break;

      case 'Update employee role':
        updateEmployeeRole();
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

  function addRole() {

    connection.query("SELECT departmentName FROM department;", function (err, res) {
      if (err) throw err;

      inquirer.prompt([
        {
          type: 'input',
          name: 'newTitle',
          message: 'Please enter the Role/Title Name'
        },
        {
          type: 'input',
          name: 'newSalary',
          message: 'Please enter the Salary for the Role/Title'
        },
        {
          type: 'list',
          name: 'department',
          choices: function () {
            const departmentName = []
            for (var i = 0; i < res.length; i++) {
              departmentName.push(res[i].departmentName);
            }
            return departmentName;
          },
          message: "Select the department"
        }
      ]).then((responses) => {

        const department = "SELECT id FROM department WHERE departmentName = ?";

        let id;

        connection.query(department, [responses.department], function (err, queryResult) {

          for (i = 0; i < queryResult.length; i++) {

            department_id = queryResult[i].id;

          }
          connection.query("INSERT INTO role SET ?",
            {
              title: responses.newTitle,
              salary: responses.newSalary,
              department_id: department_id
            },

            function (err, res) {
              if (err) return err;
              console.clear();
              console.log("Role added")

            });

          viewAllRoles();
          mainMenu();

        });

      });

    });

  };

  function addEmployee() {

    connection.query("SELECT title FROM role;", function (err, res) {
      if (err) throw err;

      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Please enter Employee first name'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Please enter Employee last name'
        },
        {
          type: 'list',
          name: 'role',
          choices: function () {
            const title = []
            for (var i = 0; i < res.length; i++) {
              title.push(res[i].title);
            }
            return title;
          },
          message: "Select the Employee title"
        },
        {
          type: 'input',
          name: 'manager',
          message: 'Enter Manager ID'
        }

      ]).then((responses) => {

        const role = "SELECT id FROM role WHERE title = ?";

        let role_id;

        connection.query(role, [responses.role], function (err, queryResult) {

          for (i = 0; i < queryResult.length; i++) {

            role_id = queryResult[i].id;

          }
          connection.query("INSERT INTO employee SET ?",
            {
              first_name: responses.first_name,
              last_name: responses.last_name,
              role_id: role_id,
              manager_id: responses.manager
            },

            function (err, res) {
              if (err) return err;
              console.clear();
              console.log("Employee added")

            });

          viewAllEmployees();
          mainMenu();

        });

      });

    });

  };

  function updateEmployeeRole() {

    connection.query("SELECT employee.id, employee.first_name, employee.last_name,  role.title " +
      " FROM employee " +
      "LEFT JOIN role ON employee.role_id =  role.id;", function (err, res) {

        if (err) throw err;

        inquirer.prompt([

          {
            type: 'list',
            name: 'employeeRole',
            choices: function () {
              const employee = []
              for (var i = 0; i < res.length; i++) {


                employee.push(res[i].id + ' -  Employee Name: ' + res[i].first_name + ' ' + res[i].last_name +
                  ' Title: ' + res[i].title);

              }
              return employee;
            },
            message: "Select the Employee"
          },
          {
            type: 'list',
            name: 'newRole',
            choices: function () {

            },

            message: 'Enter New Role'
          }

        ]).then((response) => {

            connection.query("UPDATE employee SET WHERE ?",

              {

                first_name: employee.first_name,

              },
              {
                role_id: response.newRole
              },
            
          function(err) {
            if (err) throw err
            console.table(response)
            console.log("Record Updaated");
          viewAllEmployees();
          mainMenu();

          });
      });
  });
};







};
mainMenu();