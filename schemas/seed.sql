USE employee_tracker;
SET FOREIGN_KEY_CHECKS=0;

-- department seed --

INSERT INTO department (departmentName)
VALUES ("1100 - Client Support");

INSERT INTO department (departmentName)
VALUES ("1200 - Technical Support");

INSERT INTO department (departmentName)
VALUES ("1501 - Benefits");

INSERT INTO department (departmentName)
VALUES ("1700 - Tax");

-- role seed --

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Technical Support Consultant", 75000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Developer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Financial Systems Director", 160000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager Tax & Revenue", 120000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Director", 120000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Boomi Adminstrator", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Consultant", 60000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Revenue Manager", 110000, 4);

-- employees seed  --

INSERT INTO employee (first_name, last_name, role_id )
VALUES ("Shmi", "Skywalker", 1);

INSERT INTO employee (first_name, last_name, role_id )
VALUES ("Anakin", "Skywalker", 2);

INSERT INTO employee (first_name, last_name, role_id )
VALUES ("Luke", "Skywalker", 3);

INSERT INTO employee (first_name, last_name, role_id )
VALUES ("Cere", "Junda", 4);

INSERT INTO employee (first_name, last_name, role_id ,manager_id)
VALUES ("Mace", "Windu", 5, 1);

INSERT INTO employee (first_name, last_name, role_id ,manager_id)
VALUES ("Rey", "", 6, 2);

INSERT INTO employee (first_name, last_name, role_id ,manager_id)
VALUES ("Qui-Gon", "Jinn", 7, 1);

INSERT INTO employee (first_name, last_name, role_id ,manager_id)
VALUES ("Obi-Wan", "Kenobi", 8, 9);