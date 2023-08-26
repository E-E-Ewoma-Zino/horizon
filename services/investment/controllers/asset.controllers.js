const STATUS = require("../../../constants/status.constants");
const { create_asset_factory, update_asset_factory, delete_asset_factory, get_all_asset_factory, get_asset_factory, get_asset_details_factory, vezgo_auth_factory } = require('../factory/asset.factory');

/**
 * ### Assets Controller
 * #### Create new Asset
 * Create an asset(either crypto or bank)
 */
exports.create_asset = async (req, res) => {
	try {
		const { status, ...more } = await create_asset_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({
			message: error.message,
			error: "An Unknow Error",
			status: STATUS.SERVER_ERR_500,
		});
	}
}

/**
 * ### Assets Controller
 * #### Update Asset
 * Update an asset
 * @deprecated Asset should no longer be updated
 */
exports.update_asset = async (req, res) => {
	try {
		const { status, ...more } = await update_asset_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({
			message: error.message,
			error: "An Unknow Error",
			status: STATUS.SERVER_ERR_500,
		});
	}
}

/**
 * ### Assets Controller
 * #### Delete Asset
 * Delete an asset
 */
exports.delete_asset = async (req, res) => {
	try {
		const { status, ...more } = await delete_asset_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({
			message: error.message,
			error: "An Unknow Error",
			status: STATUS.SERVER_ERR_500,
		});
	}
}

/**
 * ### Assets Controller
 * #### Get all Asset
 * Get all asset specific to a user
 */
exports.get_all_asset = async (req, res) => {
	try {
		const { status, ...more } = await get_all_asset_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({
			message: error.message,
			error: "An Unknow Error",
			status: STATUS.SERVER_ERR_500,
		});
	}
}

/**
 * ### Assets Controller
 * #### Get Asset
 * Get a asset specific to a user
 */
exports.get_one_asset = async (req, res) => {
	try {
		const { status, ...more } = await get_asset_factory(req.body);
		res.status(status).json({ status, ...more });
	} catch (error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({
			message: error.message,
			error: "An Unknow Error",
			status: STATUS.SERVER_ERR_500,
		});
	}
}

/**
 * ### Assets Controller
 * #### Get Asset Details
 * Get formated data on all asset for a user
 */
exports.asset_details = async (req, res) => {
	try {
		const { status, ...more } = await get_asset_details_factory(req.body.user);
		res.status(status).json({ status, ...more });
	} catch (error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({
			message: error.message,
			error: "An Unknow Error",
			status: STATUS.SERVER_ERR_500,
		});
	}
}

/**
 * ### Assets Controller
 * #### Send Vezgo token
 * Authorization for vezgo. This returns a token
 */
exports.vezgo_auth = async (req, res) => {
	try {
		const authorization = req.get('Authorization');
		const { status, ...more } = await vezgo_auth_factory(authorization);
		res.status(status).json({ status, ...more });
	} catch (error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({
			message: error.message,
			error: "An Unknow Error",
			status: STATUS.SERVER_ERR_500,
		});
	}
}