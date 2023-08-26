const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const assetDao = require('../dao/asset.dao');
const Vezgo = require("vezgo-sdk-js");

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

exports.vezgo_auth_factory = async (authorization) => {
	try {
		const vezgo = Vezgo.init({
			clientId: "7i3ujeug5ab2qbm6kp0ld6mlgv",
			secret: "1gu4sp0sgbhro2pkfmu9d8ialou6teul7echsj5bfautp2616gvp",
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