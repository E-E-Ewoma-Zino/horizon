const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const assetDao = require('../dao/asset.dao');

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
	console.log("logo", data)
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

exports.delete_asset_factory = async (id) => {
	try {
		const result = await assetDao.delete(id);
		if (!result)
			throw {
				status: STATUS.NOT_FOUND_404,
				error: "NOT FOUND",
				message: "User does not exist: " + _id,
				result,
			};
		return {
			status: STATUS.OK_200,
			message: "User Successfully Deleted",
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
			message: "No Liabilities associated with this user: " + data.user,
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



exports.get_asset_factory = async (id) => {
	try {
		const result = await assetDao.findById(id);

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