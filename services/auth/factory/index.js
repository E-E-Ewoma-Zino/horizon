const bcrypt = require("bcryptjs");
const OTPDao = require("../dao/otp.dao");
const UserDao = require("../dao/user.dao");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const generalEmmiter = require("../../notification/listeners");
const tokenizerHelper = require("../../../helper/tokenizer.helper");

/**
 * ### Auth User Factory
 * Use this method to send OTP to a user
 */
exports.verify_user_factory = async (data) => {
	try {
		const { result } = await this.create_otp_factory({ email: data.email, use: "AUTH" });

		// send otp to email
		// if Successfully create send mail to beneficiary
		// generalEmmiter.emit("verify_user", result);

		// TODO: send welcome mail to user

		// After 10mins delete the otp
		setTimeout(async () => {
			console.log("Removing OTP", result);
			await this.remove_otp_factory(result);
		}, 600 * 100);

		return {
			status: STATUS.CREATED_201,
			message: "Sent OTP to email: " + data.email,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Auth OTP Factory
 * Use this method to create a new OTP
 */
exports.create_otp_factory = async (data) => {
	try {
		const result = await OTPDao.create(data.email, data.use);

		if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			message: "Something prevent creation of the otp",
			error: null,
			result
		}

		return {
			status: STATUS.CREATED_201,
			message: "Sent OTP to email: " + data.email,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Auth OTP Factory
 * This message deletes an OTP after 10mins
 */
exports.remove_otp_factory = async (data) => {
	try {
		const result = await OTPDao.remove(data);
		// send otp to email

		if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			message: "Something prevent deletation of the otp",
			error: null,
			result
		}

		return {
			status: STATUS.OK_200,
			message: "Deleted OTP sent to email: " + data.email,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Auth OTP Factory
 * This message deletes an OTP after 10mins
 */
exports.verify_otp_factory = async (data) => {
	try {
		const result = await OTPDao.findOne({...data, use: "AUTH"});
		// send otp to email

		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			message: "Seams like your OTP has expire or doesn't exist",
			error: null,
			result
		}

		// delete the otp
		await this.remove_otp_factory(result);

		// after verified user and otp
		// check if user already exist. 
		// if no user, create one. 
		let theUser = await UserDao.findOne({ email: data.email });

		if (!theUser) theUser = await UserDao.create({ email: data.email });

		// create token and send
		const { token, refreshToken } = tokenizerHelper(theUser.email, theUser._id);

		return {
			status: STATUS.OK_200,
			message: "User is verified",
			error: null,
			result: {
				token,
				refreshToken,
				user: theUser
			}
		}
	} catch (error) {
		return ERROR(error);
	}
}

/**
 * ### Vault Factory
 * Use this method set a users vault pin
 */
exports.set_vault_pin_factory = async (data) => {
	try {
		const theUser = await UserDao.findById(data.user);
		if (!theUser) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: `Could not get this user. Login and try again`,
			result: {
				access: false
			}
		}

		// if user already have a vault_pin. Request OTP before setting vault
		if (theUser.vault_pin) {
			// this expects the otp to be in the data object
			if(!data.otp || !data.email) throw {
				status: STATUS.BAD_REQUEST_400,
				message: "To reset pin you must provice both OTP and Email",
				error: "RESET_FAILED",
				result: null
			}

			const result = await OTPDao.findOne({otp: data.otp, email: data.email, use: "VAULT"});

			if (!result) throw {
				status: STATUS.NOT_FOUND_404,
				message: "Seams like your OTP has expire or doesn't exist",
				error: null,
				result
			}

			// delete the otp
			await this.remove_otp_factory(result);
		}

		// encrypt pin
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(data.pin, salt);

		const setPin = await UserDao.update(theUser._id, { vault_pin: hash });

		if (!setPin) throw {
			status: STATUS.SERVER_ERR_500,
			error: "SET_VAULT_ERROR",
			message: `Failed to set user pin. Try again`,
			result: {
				access: false
			}
		}

		return {
			status: STATUS.OK_200,
			error: null,
			message: `Your vault is ready!`,
			result: {
				access: true
			}
		}
	} catch (err) {
		console.error("ede", err);
		return ERROR(err);
	}
}

/**
 * ### Vault Factory
 * Use this method grant access into a vault
 */
exports.access_vault_factory = async (data) => {
	try {
		const theUser = await UserDao.findById(data.user);
		if (!theUser) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: `Could not get this user. Login and try again`,
			result: theUser
		}

		if (!theUser.vault_pin) throw {
			status: STATUS.UNAVALIABLE_410,
			error: "UNINITIALIZED_VAULT_ERROR",
			message: `This user has not initialize a vault. Create a pin!`,
			result: {
				access: false
			}
		}

		// decrypt pin
		var isAccessed = bcrypt.compareSync(data.pin, theUser.vault_pin);

		if (!isAccessed) throw {
			status: STATUS.UNAUTHORIZED_401,
			error: "ACCESS_VAULT_ERROR",
			message: `The pin you entered is incorrect!`,
			result: {
				access: isAccessed
			}
		}

		// Generate vault token for accessing the vault service
		const { vaultToken } = tokenizerHelper(theUser.email, theUser._id);

		return {
			status: STATUS.OK_200,
			error: null,
			message: `Access Granted!`,
			result: {
				access: isAccessed,
				vaultToken
			}
		}
	} catch (err) {
		return ERROR(err);
	}
}


/**
 * ### Auth User Factory
 * Use this method to send OTP to a user
 */
exports.forgot_vault_pin_factory = async (data) => {
	try {
		const { result } = await this.create_otp_factory({ email: data.email, use: "VAULT" });

		// send otp to email
		// generalEmmiter.emit("verify_user", result);

		// After 10mins delete the otp
		setTimeout(async () => {
			console.log("Removing OTP", result);
			await this.remove_otp_factory(result);
		}, 600 * 100);

		return {
			status: STATUS.CREATED_201,
			message: "Sent OTP to email: " + data.email,
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}
}