const express = require("express");
const settings = require("../config");
const benefactorRoute = require("../services/beneficiaries/routes/benefactor.route");
const app = express();

/**
 * ### Express Initializer
 * Calling this method will setup Express for this app
 */
const ExpressLoader = async () => {
	try {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		benefactorRoute(app);

		// App running
		app.listen(settings.port, () => console.log(`Server running on port ${settings.port}...`));
	} catch (err) {
		console.error(err);
	}

};

module.exports = ExpressLoader;