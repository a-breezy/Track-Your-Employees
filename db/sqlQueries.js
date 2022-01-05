// const connection = require("./connection");

// // query to view all departments
// const viewAllDepartments = () => {
//     connection.createQuery("SELECT id, name AS 'Department Name' FROM department;")
// }

// // query to view all roles
// const viewAllRoles() {
//     connection.createQuery("SELECT role.id AS 'Role ID', title AS 'Role Title', salary, name AS 'Department Name' FROM role LEFT JOIN department ON department.id = role.department_id;")
//     // job title, role id, the department that role belongs to,
//     // and the salary for that role
// }

// // query to view all employees
// const viewAllEmployees() {
//     connection.createQuery("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;")
// }

// // query to add department
// // name of the department and that department is added to the database
// const addDepartment() {
//     connection.createQuery("INSERT INTO department (name) VALUES (?)")
// }

// // query to add role
// // name, salary, and department for the role and that role is added to the database
// const addRole() {
//     connection.createQuery()
// }

// // query to add employee
// // employee’s first name, last name, role, and manager, and that employee is added to the database
// const addEmployee() {
//     connection.createQuery()
// }

// // query to update employee
// // select an employee to update and their new role and this information is updated in the database
// const updateEmployee() {
//     connection.createQuery()
// }
