const _ = require("lodash");
const VaultDAO = require("../dao");
const bcrypt = require("bcryptjs");
const userDao = require("../../auth/dao/user.dao");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const { default: mongoose } = require("mongoose");

/**
 * ### Vault Factory
 * Use this method to create a new vault 
 */
exports.create_vault_factory = async (data) => {
	try {
		const result = await VaultDAO.create(data);

		if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			error: "SERVER_ERROR",
			message: "Failed to create Vault",
			result
		}

		return {
			status: STATUS.CREATED_201,
			message: "Successfully created vault",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Vault Factory
 * Use this method to Get a Vault by ID
 */
exports.get_vault_factory = async (data) => {
	try {
		const result = await VaultDAO.findById(data);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "SERVER_ERROR",
			message: "Failed to find Vault with id: " + data._id,
			result
		}

		return {
			status: STATUS.OK_200,
			message: "Successfully found vault",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Vault Factory
 * Use this method to update vault
 * Note: Request data must contain _id 
 * @example update_vault({...otherData, _id: "23237778a99c22c282ae8"});
 */
exports.update_vault_factory = async (data) => {
	try {
		const { _id, name, ben } = data;

		const theVault = await VaultDAO.findById(_id);

		if (!theVault) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT_FOUND",
			message: "Failed to find vault with id: " + _id,
			result: theVault
		}

		let result;

		// update the name
		if (name) result = await VaultDAO.update(_id, { name });

		// add ben
		if (ben?.beneficiaries?.length && ben.method) {
			const newBen = addOnlyNewBen(ben.beneficiaries, theVault);
			result = await VaultDAO.update(_id, { $push: { beneficiaries: newBen } });
		}

		// remove ben
		if (ben?.beneficiaries?.length && !ben.method) {
			result = await VaultDAO.update(_id, { $pull: { beneficiaries: { $in: ben.beneficiaries } } });
		}

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT_FOUND",
			message: "Failed to update Vault with id: " + _id,
			result
		}

		return {
			error: null,
			status: STATUS.OK_200,
			message: "Successfully updated vault",
			result: result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * This method removes all id that already exist in the vault beneficiaries form the new list of id
 * @param {Array} beneficiaries An array of alphanum
 * @param {Object} theVault An object that contains an arr of object Id for beneficiaries
 * @returns Array of new id of beneficiaries to be added to the vault
 */
function addOnlyNewBen(beneficiaries, theVault) {
	const addBen = [];

	// because we can't compare mongoose id and string directly, we would first convert the Id to strings and store it in an array before compering
	const vaultBeneficiaries = [];

	theVault.beneficiaries.forEach(ben => vaultBeneficiaries.push(ben.toString()));

	// make sure beneficiaries id is unique in the Vault
	// that is we are not going to add a ben that is already in the vault
	beneficiaries.forEach(ben => {
		if (!_.includes(vaultBeneficiaries, ben)) addBen.push(ben);
	});

	return addBen;
}

/**
 * ### Vault Factory
 * Use this method to delete a vault
 * Note: Request data must contain _id 
 * @example delete_vault({...otherData, _id: "23237778a99c22c282ae8"});
 */
exports.delete_vault_factory = async (data) => {
	try {
		const result = await VaultDAO.remove(data);

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "Vault does not exist: " + data._id,
			result
		}

		return {
			status: STATUS.OK_200,
			message: "Vault Successfully Deleted",
			result
		}

	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Vault Factory
 * Use this method to get all users vault
 * Note: Request data must contain _id 
 * @example delete_vault({...otherData, _id: "23237778a99c22c282ae8"});
 */
exports.get_all_vault_factory = async (data) => {
	try {
		const result = await VaultDAO.findAllByUser(data);
		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: `${result.length} Vault found for user with id ${data.user}`,
			result
		}
		return {
			status: STATUS.OK_200,
			message: `${result.length} Vault found:`,
			result
		}
	} catch (err) {
		return ERROR(err);
	}
}
