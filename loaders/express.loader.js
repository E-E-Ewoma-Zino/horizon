const cors = require("cors");
const express = require("express");
const settings = require("../config");
const authRoutes = require('../services/auth/routes/index.routes');
const vaultRoutes = require("../services/vault/routes/index.routes");
const assetRoutes = require('../services/investment/routes/asset.routes');
const liabilityRoutes = require("../services/investment/routes/liability.routes");
const benefactorRoutes = require("../services/beneficiaries/routes/benefactor.routes");

/**
 * ### Express Initializer
 * Calling this method will setup Express for this app
*/
const ExpressLoader = async () => {
	try {
		const app = express();
		app.use(express.urlencoded({
			extended: true,
			type: 'application/x-www-form-urlencoded'
		}));
		app.use(express.json());
		app.use(cors({origin: "*"}));

		// 
		authRoutes(app);
		assetRoutes(app);
		vaultRoutes(app);
		liabilityRoutes(app);
		benefactorRoutes(app);

		// App running
		app.listen(settings.port, () => console.log(`Server running on port ${settings.port}...`));
	} catch (err) {
		console.error(err);
	}
};

module.exports = ExpressLoader;