const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// endpoint to show data for all employees
router.get("/employees", (req, res) => {
	const sql = `SELECT * FROM employee`;
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: rows,
		});
	});
});

// endpoint to add data for all employees
router.post("/employees", ({ body }, res) => {
	const errors = inputCheck(
		body,
		"first_name",
		"last_name",
		"role_id",
		"manager_id"
	);
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
	const params = [
		body.first_name,
		body.last_name,
		body.role_id,
		body.manager_id,
	];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: body,
		});
	});
});

module.exports = router;
