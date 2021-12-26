const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connnection");
const apiRoutes = require("./routes/apiRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// default response for any request -- Not Found
app.use((req, res) => {
	res.status(404).end();
});

db.connect((err) => {
	if (err) throw err;
	console.log("Database Connected");
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
