const express = require("express");
const settings = require("../config");
const benefactorRoutes = require("../services/beneficiaries/routes/benefactor.routes");
const liabilityRoutes = require("../services/investment/routes/liability.routes");
const assetRoutes = require('../services/investment/routes/asset.routes');

const app = express();

/**
 * ### Express Initializer
 * Calling this method will setup Express for this app
 */
const ExpressLoader = async () => {
	try {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		// 
		benefactorRoutes(app);
		liabilityRoutes(app);
		assetRoutes(app);

		// App running
		app.listen(settings.port, () => console.log(`Server running on port ${settings.port}...`));
	} catch (err) {
		console.error(err);
	}

};

module.exports = ExpressLoader;