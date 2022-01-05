const db = require("../db/connection");
const inputCheck = require("../utils/inputCheck");

// show data for all employees
const selectEmployees = (startQuestions) => {
	const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;`;
	db.query(sql, (err, rows) => {
		if (err) {
			throw err;
		}
		console.table(rows);
		startQuestions();
	});
};

// route to show data for single employee
const selectEmployee = (startQuestions, body) => {
	const errors = inputCheck(body, "id");
	if (errors) {
		throw errors;
	}

	const sql = `SELECT * FROM employee WHERE id = ?`;
	const params = [req.params.id];

	db.query(sql, params, (err, rows) => {
		if (err) {
			throw err;
		}
		console.table(rows);
		startQuestions();
	});
};

// endpoint to add data for all employees
const addNewEmployee = (startQuestions, body) => {
	const errors = inputCheck(
		body,
		"first_name",
		"last_name",
		"role_id",
		"manager_id"
	);
	if (errors) {
		throw errors;
	}

	const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
	const params = [
		body.first_name,
		body.last_name,
		body.role_id,
		body.manager_id,
	];

	db.query(sql, params, (err, rows) => {
		if (err) {
			throw err;
		}
		console.table(rows);
		startQuestions();
	});
};

// update employee data role
const updateEmployee = (startQuestions, body) => {
	const errors = inputCheck(body, "role_id");
	if (errors) {
		throw errors;
	}

	const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
	const params = [body.role_id, body.id];

	db.query(sql, params, (err, rows) => {
		if (err) {
			throw err;
		} else if (!rows.affectedRows) {
			console.log("Employee not found");
		} else {
			console.table(rows);
			startQuestions();
			// res.json({
			// 	message: "success",
			// 	data: req.body,
			// 	changes: result.affectedRows,
			// });
		}
	});
};

module.exports = {
	selectEmployees,
	selectEmployee,
	addNewEmployee,
	updateEmployee,
};
