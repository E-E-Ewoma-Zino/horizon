const BeneficiaryDAO = require("../dao");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const generalEmmiter = require("../../notification/listeners");

/**
 * ### Beneficiaries Factory
 * Use this method to create a new beneficiary 
 */
exports.create_beneficiary_factory = async (data) => {
	try {
		const result = await BeneficiaryDAO.create(data);

		if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			error: "SERVER_ERROR",
			message: "Failed to create Beneficiary",
			result
		}

		// if Successfully create send mail to beneficiary
		generalEmmiter.emit("new_benefactor", result);

		return {
			status: STATUS.CREATED_201,
			message: "Successfully created beneficiary",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}


/**
 * ### Beneficiaries Factory
 * Use this method to create a new beneficiary 
 */
exports.get_beneficiary_factory = async (data) => {
	try {
		const result = await BeneficiaryDAO.findById(data);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "SERVER_ERROR",
			message: "Failed to find Beneficiary with id: " + data._id,
			result
		}

		return {
			status: STATUS.OK_200,
			message: "Successfully found beneficiary",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}


/**
 * ### Beneficiaries Factory
 * Use this method to update beneficiary
 * Note: Request data must contain _id 
 * @example update_beneficiary({...otherData, _id: "23237778a99c22c282ae8"});
 */
exports.update_beneficiary_factory = async (data) => {
	const {_id, ...others} = data;
	try {
		const result = await BeneficiaryDAO.update(_id, others);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT_FOUND",
			message: "Failed to update Beneficiary with id: " + _id,
			result
		}
		return {
			error: null,
			status: STATUS.OK_200,
			message: "Successfully updated beneficiary",
			result: result
		}
	} catch (error) {
		return ERROR(error);
	}
}