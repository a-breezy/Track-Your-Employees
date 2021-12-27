const inquirer = require("inquirer");

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
		],
	},
];

const newDept = [
	{
		type: "input",
		name: "newDept",
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
		name: "newRole",
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
		name: "deptChoices",
		message: "What department does this role belong to?",
		choices: [1, 2, 3],
	},
	{
		type: "input",
		name: "roleSalary",
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
		name: "firstName",
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
		name: "lastName",
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
		name: "role",
		message: "What's the employee's role?",
		choices: [1, 2, 3],
	},
	{
		type: "list",
		name: "manager",
		message: "Who's the employee's manager?",
		choices: [1, 2, 3],
	},
];

// view all departments, view all roles, view all employees,
// add a department, add a role, add an employee,
// and update an employee role

inquirer.prompt(questions)
    .then( 
    if (answers === "View all Departments") {
            // `SELECT * FROM department`;
    } else if (answers === "View all Roles") {
        // `SELECT * FROM role`;
    } else if (answers === "View all Employees") {
        // `SELECT * FROM employee`;
    } else if (answers === "Add a new Department") {
        // `INSERT INTO department (name)
		// VALUES (?)`;
    } else if (answers === "Add a new Role") {
        // `INSERT INTO role (title, salary, department_id)
		// VALUES (?,?,?)`;
    } else if (answers === "Add a new Employee") {
        // `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        // VALUES (?,?,?,?)`;
    } else if (answers === "Update Exisiting Employee Role") {
        // `UPDATE employee SET role_id = ? WHERE id = ?`;
    }
);
