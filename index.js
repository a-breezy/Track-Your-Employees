const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require("./db/sqlQueries");
const connection = require("./db/connection");
const { selectDepartments, addDepartment } = require("./queries/department");
const {
	selectEmployees,
	selectEmployee,
	addNewEmployee,
	updateEmployee,
} = require("./queries/employee");
const { selectAllRoles, addNewRole } = require("./queries/role");
// const {selectDepartments, addDepartment} = require('./queries/department')

connection.connect(function (err) {
	if (err) throw err;
	startQuestions();
});

// function to create
const questions = [
	{
		type: "list",
		name: "options",
		message: "What would you like to do?",
		choices: [
			"View all Departments",
			"View all Roles",
			"View all Employees",
			"Add a new Department",
			"Add a new Role",
			"Add a new Employee",
			"Update Exisiting Employee Role",
			// extra
			// "Remove an Employee",
			// "Update Employee Manager"
		],
	},
];

const newDept = [
	{
		type: "input",
		name: "name",
		message: "What department would you like to create?",
		validate: (newDeptInput) => {
			if (newDeptInput) {
				return true;
			} else {
				console.log("Enter a department name");
				return false;
			}
		},
	},
];

const newRole = [
	{
		type: "input",
		name: "title",
		message: "What role would you like to create?",
		validate: (newRoleInput) => {
			if (newRoleInput) {
				return true;
			} else {
				console.log("Enter a role name");
				return false;
			}
		},
	},
	{
		type: "list",
		name: "department_id",
		message: "What department does this role belong to?",
		choices: [1, 2, 3], // placeholders for whatever user defines departments as
	},
	{
		type: "input",
		name: "salary",
		message: "What is the salary for the role?",
		validate: (roleSalaryInput) => {
			if (roleSalaryInput) {
				return true;
			} else {
				console.log("Enter a salary");
				return false;
			}
		},
	},
];

const newEmployee = [
	{
		type: "input",
		name: "first_name",
		message: "What's the new employee's first name?",
		validate: (firstNameInput) => {
			if (firstNameInput) {
				return true;
			} else {
				console.log("first name");
				return false;
			}
		},
	},
	{
		type: "input",
		name: "last_name",
		message: "What's the new employee's lastname?",
		validate: (lastNameInput) => {
			if (lastNameInput) {
				return true;
			} else {
				console.log("last name");
				return false;
			}
		},
	},
	{
		type: "list",
		name: "role_id",
		message: "What's the employee's role?",
		choices: [1, 2, 3], // placeholders for whatever user defines departments as
	},
	{
		type: "list",
		name: "manager_id",
		message: "Who's the employee's manager?",
		choices: [1, 2, 3], // placeholders for whatever user defines departments as
	},
];

const updateEmployeeRole = [
	{
		type: "input",
		name: "id",
		message: "What employee id are you updating?",
	},
	{
		type: "list",
		name: "role_id",
		message: "What's the employee's new role?",
		choices: [1, 2, 3], // placeholders for whatever departments
	},
];

// view all departments, view all roles, view all employees,
// add a department, add a role, add an employee,
// and update an employee role
function startQuestions() {
	inquirer.prompt(questions).then(function (answers) {
		console.log(answers);
		if (answers.options === "View all Departments") {
			selectDepartments(startQuestions);
		} else if (answers.options === "View all Roles") {
			selectAllRoles(startQuestions);
		} else if (answers.options === "View all Employees") {
			selectEmployees(startQuestions);
		} else if (answers.options === "Add a new Department") {
			inquirer.prompt(newDept).then(function (answers) {
				console.log(answers);
				addDepartment(startQuestions, answers);
			});
		} else if (answers.options === "Add a new Role") {
			inquirer.prompt(updateEmployeeRole).then(function (answers) {
				console.log(answers);
				addNewRole(startQuestions, answers);
			});
		} else if (answers.options === "Add a new Employee") {
			inquirer.prompt(newEmployee).then(function (answers) {
				console.log(answers);
				addNewEmployee(startQuestions, answers);
			});
		} else if (answers.options === "Update Exisiting Employee Role") {
			inquirer.prompt(updateEmployeeRole).then(function (answers) {
				console.log(answers);
				updateEmployee(startQuestions, answers);
			});
		}
	});
}
