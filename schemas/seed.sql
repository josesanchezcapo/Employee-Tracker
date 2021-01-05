USE employee_tracker;

----- department seed -----

INSERT INTO department (id, name)
VALUES (1, "1100 - Client Support");

INSERT INTO department (id, name)
VALUES (2, "1200 - Technical Support");

INSERT INTO department (id, name)
VALUES (3, "1501 - Benefits");

INSERT INTO department (id, name)
VALUES (4, "1700 - Tax");

----- role seed -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Customer Service", 60000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Technical Support Consultant", 75000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Senior Developer", 150000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Financial Systems Director", 160000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Manager Tax & Revenue", 120000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "HR Director", 120000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Boomi Adminstrator", 100000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "HR Consultant", 60000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "Revenue Manager", 110000, 4);

----- employees seed  -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Shmi", "Skywalker", 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Anakin", "Skywalker", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Luke", "Skywalker", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Cere", "Junda", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Mace", "Windu", 5, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Rey", "", 6, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Qui-Gon", "Jinn", 7, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Obi-Wan", "Kenobi", 8, 9);