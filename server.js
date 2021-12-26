const express = require("express");
require("dotenv").config();
const inquirer = require("inquirer");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 5001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use apiRoutes
app.use("/api", apiRoutes);

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
