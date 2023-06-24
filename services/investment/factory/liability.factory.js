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
exports.delete_liability_factory = async (data) => {
	try {
		const result = await liabilityDao.remove(data);
		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "Liability does not exist for: " + data._id,
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


/**
 * ### Liabilities Factory
 * Use this method to get all liabilities
 * Note: data can contain a query 
 * @example get_all_liability_factory({user: "23237778a99c22c282ae8", typeOf: "loan"});
 */
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


/**
 * ### Liabilities Factory
 * Use this method to get details about all liability
 * this detail will contain total of all liability, total for each liability, and each liability in it's own field
 * Note: Request data must contain _id 
 * @example get_liability_details_factory("23237778a99c22c282ae8");
 */
exports.get_liability_details_factory = async (userId) => {
	try {
		const allUserLiabilities = await liabilityDao.findAllByUser({user: userId});
		const details = {};

		if (!allUserLiabilities.length) throw {
			status: STATUS.NOT_FOUND_404,
			error: "SERVER_ERROR",
			message: "Failed to find liability with user: " + userId,
			result: allUserLiabilities,
		};

		// separate liability
		allUserLiabilities.forEach(lib => {
			// push arr to all property in the details.liabilityType.
			Array.isArray(details[lib.typeOf]?.all) ? details[lib.typeOf].all.push(lib): details[lib.typeOf] = {all: [lib]};

			// get total liability for each liability
			details[lib.typeOf].total ? details[lib.typeOf].total += lib.valueUSD: details[lib.typeOf].total = lib.valueUSD;

			// liability count
			details[lib.typeOf].count ? details[lib.typeOf].count++: details[lib.typeOf].count = 1;

			// get total of alll liability
			details.total? details.total += lib.valueUSD: details.total = lib.valueUSD;
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