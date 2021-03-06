const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require("./db/sqlQueries");
const connection = require("./db/connection");
const { selectDepartments, addDepartment } = require("./queries/department");
const {
	selectEmployees,
	// selectEmployee, --> future development to select employee by id
	addNewEmployee,
	updateEmployee,
	selectEmployeeByManager,
	selectEmployeeDept,
	updateEmployeeManager,
} = require("./queries/employee");
const { selectAllRoles, addNewRole } = require("./queries/role");
// const db = require("./db/connection");

connection.connect(function (err) {
	if (err) throw err;
	startQuestions();
});

// function to create inquirer questions
const questions = [
	{
		type: "list",
		name: "options",
		message: "What would you like to do?",
		choices: [
			"View all Departments",
			"View all Roles",
			"View all Employees",
			"View Employees by Manager",
			"View Employees by Department",
			"Add a new Department",
			"Add a new Role",
			"Add a new Employee",
			"Update Exisiting Employee Role",
			"Update Exisiting Employee's Manager",
			// extra
			// "Remove an Employee",
			// "Update Employee Manager"
		],
	},
];

// view employees by manager
const managerId = [
	{
		type: "input",
		name: "manager_id",
		message: "What's the ID of the manager you want to search by?",
		validate: (managerIdInput) => {
			if (managerIdInput) {
				return true;
			} else {
				console.log("Enter a manager ID");
				return false;
			}
		},
	},
];

// search employees by department
let employeeDept;
function employeeDeptQuery() {
	connection.query("SELECT name FROM department", (err, depts) => {
		if (err) {
			throw err;
		}
		connection.query(
			"SELECT d.name, e.id, e.first_name, e.last_name FROM department d INNER JOIN role r ON r.department_id = d.id INNER JOIN employee e ON e.role_id = r.id order by d.id, r.id",
			(err, depts) => {
				if (err) {
					throw err;
				}
				employeeDept = [
					{
						type: "list",
						name: "department_id",
						message: "Which department would you like to search?",
						choices: depts,
					},
				];
			}
		);
	});
}
employeeDeptQuery();

// create new department
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

// create new employee role
let newRole;
function newRoleQuery() {
	connection.query("SELECT id AS value, name FROM department", (err, dept) => {
		if (err) {
			throw err;
		}
		newRole = [
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
				choices: dept,
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
	});
}
newRoleQuery();

// create new employee
let newEmployee;
function newEmployeeQueries() {
	connection.query(
		"SELECT id AS value, title AS name FROM role",
		(err, roles) => {
			if (err) {
				throw err;
			}
			connection.query(
				"SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee",
				(err, employees) => {
					if (err) {
						throw err;
					}
					newEmployee = [
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
							choices: roles,
						},
						{
							type: "list",
							name: "manager_id",
							message: "Who's the employee's manager?",
							choices: employees, // placeholders for whatever user defines departments as
						},
					];
				}
			);
		}
	);
}
newEmployeeQueries();

// update existing employee
let updateEmployeeRole;
function getEmployeeRoleInfo() {
	connection.query(
		"SELECT id AS value, title AS name FROM role",
		(err, roles) => {
			if (err) {
				throw err;
			}
			connection.query(
				"SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee",
				(err, employees) => {
					if (err) {
						throw err;
					}
					updateEmployeeRole = [
						{
							type: "list",
							name: "employee_id",
							message: "What employee id are you updating?",
							choices: employees,
						},
						{
							type: "list",
							name: "role_id",
							message: "What's the employee's new role?",
							choices: roles,
						},
					];
				}
			);
		}
	);
}
getEmployeeRoleInfo();

// update existing manager
const updateManager = [
	{
		type: "input",
		name: "id",
		message: "What employee id would you like to update?",
		validate: (idInput) => {
			if (idInput) {
				return true;
			} else {
				console.log("Please give employee id");
				return false;
			}
		},
	},
	{
		type: "input",
		name: "manager_id",
		message: "What's the new manager ID?",
		validate: (managerIdInput) => {
			if (managerIdInput) {
				return true;
			} else {
				console.log("Please give new manager ID");
				return false;
			}
		},
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
		} else if (answers.options === "View Employees by Manager") {
			inquirer.prompt(managerId).then(function (answers) {
				console.table(answers);
				selectEmployeeByManager(startQuestions, answers);
			});
		} else if (answers.options === "View Employees by Department") {
			inquirer.prompt(employeeDept).then(function (answers) {
				console.table(answers);
				selectEmployeeDept(startQuestions, answers);
			});
		} else if (answers.options === "Add a new Department") {
			inquirer.prompt(newDept).then(function (answers) {
				console.table(answers);
				addDepartment(startQuestions, answers);
			});
		} else if (answers.options === "Add a new Role") {
			inquirer.prompt(newRole).then(function (answers) {
				console.table(answers);
				addNewRole(startQuestions, answers);
			});
		} else if (answers.options === "Add a new Employee") {
			inquirer.prompt(newEmployee).then(function (answers) {
				console.table(answers);
				addNewEmployee(startQuestions, answers);
			});
		} else if (answers.options === "Update Exisiting Employee Role") {
			inquirer.prompt(updateEmployeeRole).then(function (answers) {
				console.table(answers);
				updateEmployee(startQuestions, answers);
			});
		} else if (answers.options === "Update Exisiting Employee's Manager") {
			inquirer.prompt(updateManager).then(function (answers) {
				console.table(answers);
				updateEmployeeManager(startQuestions, answers);
			});
		}
	});
}

// Delete departments, roles, and employees
// View the total utilized budget of a department???in other words, the combined salaries of all employees in that department
