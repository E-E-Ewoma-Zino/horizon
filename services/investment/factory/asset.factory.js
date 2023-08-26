const settings = require("../../../config");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const assetDao = require('../dao/asset.dao');
const Vezgo = require("vezgo-sdk-js");

/**
 * ### Assets Factory
 * Use this method to create a new asset
 */
exports.create_asset_factory = async (data) => {
	try {
		const result = await assetDao.create(data);

		if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			error: "SERVER_ERROR",
			message: "Failed to create asset",
			result
		}

		return {
			status: STATUS.CREATED_201,
			message: "Successfully created asset",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Assets Factory
 * Use this method to update asset
 * Note: Request data must contain _id 
 * @example update_asset({...otherData, _id: "23237778a99c22c282ae8"});
 * @deprecated Assets should no longer be updated
 */
exports.update_asset_factory = async (data) => {
	const { _id, ...others } = data;
	try {
		const result = await assetDao.update(_id, others);

		if (!result)
			throw {
				status: STATUS.NOT_FOUND_404,
				error: "NOT_FOUND",
				message: "Failed to update asset with id: " + _id,
				result,
			};
		return {
			error: null,
			status: STATUS.OK_200,
			message: "Successfully updated asset",
			result: result,
		};
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Assets Factory
 * Use this method to delete a asset
 * Note: Request data must contain _id 
 * @example delete_asset({...otherData, _id: "23237778a99c22c282ae8"});
 */
exports.delete_asset_factory = async (data) => {
	try {
		const result = await assetDao.delete(data);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "Asset does not exist for id: " + data._id,
			result,
		};

		return {
			status: STATUS.OK_200,
			message: "Asset Successfully Deleted",
			result,
		};
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Assets Factory
 * Use this method to get all liabilities
 * Note: data can contain a query 
 * @example get_all_asset_factory({user: "23237778a99c22c282ae8", typeOf: "loan"});
 */
exports.get_all_asset_factory = async (data) => {
	try {
		const result = await assetDao.getAllByUser(data);
		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "No Assets associated with this user: " + data.user,
			result
		}
		return {
			status: STATUS.OK_200,
			message: `Found ${result.length} assets`,
			error: null,
			result
		}
	} catch (err) {
		return ERROR(err);
	}
}

/**
 * ### Assets Factory
 * Use this method to Get a Liability by ID
 */
exports.get_asset_factory = async (data) => {
	try {
		const result = await assetDao.findOne(data);

		if (!result)
			throw {
				status: STATUS.NOT_FOUND_404,
				error: "SERVER_ERROR",
				message: "Failed to find asset with id: " + data._id,
				result,
			};

		return {
			status: STATUS.OK_200,
			message: "Successfully found asset",
			error: null,
			result,
		};
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Assets Factory
 * Use this method to get details about all asset
 * this detail will contain total of all asset, total for each asset, and each asset in it's own field
 * Note: Request data must contain _id 
 * @example get_asset_details_factory("23237778a99c22c282ae8");
 */
exports.get_asset_details_factory = async (userId) => {
	try {
		const allUserAssets = await assetDao.getAllByUser({ user: userId });
		const details = {};

		if (!allUserAssets.length) throw {
			status: STATUS.NOT_FOUND_404,
			error: "SERVER_ERROR",
			message: "Failed to find asset with user: " + userId,
			result: allUserAssets,
		};

		// separate assets
		allUserAssets.forEach(ass => {
			// push arr to all property in the details.assetType.
			Array.isArray(details[ass.typeOf]?.all) ? details[ass.typeOf].all.push(ass) : details[ass.typeOf] = { all: [ass] };

			// get total asset for each assets
			details[ass.typeOf].total ? details[ass.typeOf].total += ass.valueUSD : details[ass.typeOf].total = ass.valueUSD;

			// asset count
			details[ass.typeOf].count ? details[ass.typeOf].count++ : details[ass.typeOf].count = 1;

			// get total of alll assets
			details.total ? details.total += ass.valueUSD : details.total = ass.valueUSD;
		});

		return {
			status: STATUS.OK_200,
			message: "Asset for " + userId,
			error: null,
			result: details,
		};
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Assets Factory
 * Use this method to auth users to get a vezgo token
 * @returns token
 */
exports.vezgo_auth_factory = async (authorization) => {
	try {
		const vezgo = Vezgo.init({
			clientId: settings.vezgoClientID,
			secret: settings.vezgoSecret,
		});

		// Handel Vezgo auth 
		// Replace with your own authentication
		const userId = authorization.replace('Bearer ', '');
		const user = vezgo.login(userId);

		return {
			status: STATUS.OK_200,
			message: "User token",
			error: null,
			result: { token: await user.getToken() },
		};
	} catch (error) {
		console.error("errrororo", error);
		return ERROR(error);
	}
}