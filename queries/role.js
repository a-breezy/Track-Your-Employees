const db = require("../db/connection");
const inputCheck = require("../utils/inputCheck");

// show data for all departments
const selectAllRoles = (startQuestions) => {
	const sql = `SELECT role.id AS 'Role ID', title AS 'Role Title', salary, name AS 'Department Name' FROM role LEFT JOIN department ON department.id = role.department_id;`;
	db.query(sql, (err, rows) => {
		if (err) {
			throw err;
		}
		console.table(rows);
		startQuestions();
	});
};

// endpoint to add data for all roles
const addNewRole = (startQuestions, body) => {
	const errors = inputCheck(body, "title", "salary", "department_id");
	if (errors) {
		throw errors;
	}

	const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?,?,?)`;
	const params = [body.title, body.salary, body.department_id];

	db.query(sql, params, (err, rows) => {
		if (err) {
			throw err;
		}
		console.table(rows);
		startQuestions();
	});
};

module.exports = { selectAllRoles, addNewRole };
