const express = require("express");
const settings = require("../config");
const app = express();

/**
 * ### Express Initializer
 * Calling this method will setup Express for this app
 */
const ExpressLoader = async () => {
	try {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		app.get("/", (req, res) => {
			res.send("Server Running");
		});

		app.listen(settings.port, () => {
			console.log(`Server running on port ${settings.port}.`);
		});

	} catch (err) {
		console.error(err);
	}

};

module.exports = ExpressLoader;