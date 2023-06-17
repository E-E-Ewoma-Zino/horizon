const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const liabilityDao = require("../dao/liability.dao");

/**
 * ### Liabilities Factory
 * Use this method to create a new liability
 */
exports.create_liability_factory = async (data) => {
	try {
		const result = await liabilityDao.create(data);

		if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			error: "SERVER_ERROR",
			message: "Failed to create Liability",
			result
		}

		return {
			status: STATUS.CREATED_201,
			message: "Successfully created liability",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Liabilities Factory
 * Use this method to Get a Liability by ID
 */
exports.get_liability_factory = async (data) => {
	try {
		const result = await liabilityDao.findById(data);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "SERVER_ERROR",
			message: "Failed to find Liability with id: " + data._id,
			result
		}

		return {
			status: STATUS.OK_200,
			message: "Successfully found liability",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Liabilities Factory
 * Use this method to update liability
 * Note: Request data must contain _id 
 * @example update_liability({...otherData, _id: "23237778a99c22c282ae8"});
 */
exports.update_liability_factory = async (data) => {
	const { _id, ...others } = data;
	try {
		const result = await liabilityDao.update(_id, others);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT_FOUND",
			message: "Failed to update Liability with id: " + _id,
			result
		}
		return {
			error: null,
			status: STATUS.OK_200,
			message: "Successfully updated liability",
			result: result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Liabilities Factory
 * Use this method to delete a liability
 * Note: Request data must contain _id 
 * @example delete_liability({...otherData, _id: "23237778a99c22c282ae8"});
 */

exports.delete_liability_factory = async (id) => {
	try {
		const result = await liabilityDao.remove(id);
		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "Liability does not exist: " + id,
			result
		}
		return {
			status: STATUS.OK_200,
			message: "Liability Successfully Deleted",
			error: null,
			result
		}

	} catch (error) {
		return ERROR(error);
	}
}

exports.get_all_liability_factory = async (data) => {
	try {
		const result = await liabilityDao.findAllByUser(data);
		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "No Liabilities associated with this user: " + data.user,
			result
		}
		return {
			status: STATUS.OK_200,
			message: `Found ${result.length} Liabilities`,
			error: null,
			result
		}
	} catch (err) {
		return ERROR(err);
	}
}