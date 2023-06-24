const BeneficiaryDAO = require("../dao");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const generalEmmiter = require("../../notification/listeners");

/**
 * ### Beneficiaries Factory
 * Use this method to create a new beneficiary 
 */
exports.create_user_factory = async (data) => {
	try {
		const result = await BeneficiaryDAO.createUser(data);

		if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			error: "SERVER_ERROR",
			message: "Failed to create Beneficiary",
			result
		}

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
exports.create_beneficiary_factory = async (data) => {
	try {
		if (data.isTrustee) {
			const resetTruestee = await this.only_one_trustee(data.user);

			if (!resetTruestee.result) throw resetTruestee;
		}

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

exports.only_one_trustee = async (userId) => {
	try {
		const trustee = await this.get_all_beneficiary_factory({ user: userId, isTrustee: true });
	
		if (!trustee.result.length) throw {
			status: STATUS.NOT_FOUND_404,
			error: "SERVER_ERROR",
			message: "Failed to find user trustee",
			result: trustee.result
		}
	
		// remove the trustee
		const removeTruestee = await this.update_beneficiary_factory({ _id: trustee.result[0]._id, isTrustee: false });
	
		if (!removeTruestee.result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "SERVER_ERROR",
			message: "Failed to reset user trustee",
			result: trustee.result
		}
	
		return {
			status: STATUS.OK_200,
			message: "Successfully reset beneficiary trustee",
			error: null,
			result: true
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Beneficiaries Factory
 * Use this method to Get a Beneficiary by ID
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
	try {
		if (data.isTrustee) {
			const resetTruestee = await this.only_one_trustee(data.user);
			
			if (!resetTruestee.result) throw resetTruestee;
		}
		
		const { _id, ...others } = data;

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

/**
 * ### Beneficiaries Factory
 * Use this method to delete a beneficiary
 * Note: Request data must contain _id 
 * @example delete_beneficiary({...otherData, _id: "23237778a99c22c282ae8"});
 */

exports.delete_beneficiary_factory = async (data) => {
	try {
		const result = await BeneficiaryDAO.remove(data);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "User does not exist: " + data._id,
			result
		}

		return {
			status: STATUS.OK_200,
			message: "User Successfully Deleted",
			result
		}

	} catch (error) {
		return ERROR(error);
	}
}

exports.get_all_beneficiary_factory = async (data) => {
	try {
		const result = await BeneficiaryDAO.findAllByUser(data);
		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "No Beneficiaries associated with this user: " + data.user,
			result
		}
		return {
			status: STATUS.OK_200,
			message: "All Beneficiaries: ",
			result
		}
	} catch (err) {
		return ERROR(err);
	}
}