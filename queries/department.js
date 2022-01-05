const db = require("../db/connection");
const inputCheck = require("../utils/inputCheck");

// show data for all departments
const selectDepartments = (startQuestions) => {
	const sql = `SELECT id, name AS 'Department Name' FROM department;`;
	db.query(sql, (err, rows) => {
		if (err) {
			throw err;
		}
		console.table(rows);
		startQuestions();
	});
};

// add data to departments
const addDepartment = (startQuestions, body) => {
	const errors = inputCheck(body, "name");
	if (errors) {
		throw errors;
	}

	const sql = `INSERT INTO department (name)
                VALUES (?)`;
	const params = [body.name];

	db.query(sql, params, (err, rows) => {
		if (err) {
			throw err;
		}
		console.table(rows);
		startQuestions();
	});
};

module.exports = { selectDepartments, addDepartment };
