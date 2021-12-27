const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// endpoint to show data for all departments
router.get("/depts", (req, res) => {
	const sql = `SELECT * FROM department`;
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

// endpoint to add data to departments
router.post("/depts", ({ body }, res) => {
	const errors = inputCheck(body, "name");
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	const sql = `INSERT INTO department (name)
                VALUES (?)`;
	const params = [body.name];

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
