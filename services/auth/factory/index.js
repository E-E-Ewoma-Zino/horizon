const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const generalEmmiter = require("../../notification/listeners");
const UserDao = require("../dao/user.dao");
const OTPDao = require("../dao/otp.dao");
const tokenizerHelper = require("../../../helper/tokenizer.helper");

/**
 * ### Auth User Factory
 * Use this method to send OTP to a user
 */
exports.verify_user_factory = async (data) => {
	try {
		const {result} = await this.create_otp_factory({ email: data.email });
		
		// send otp to email
		// if Successfully create send mail to beneficiary
		generalEmmiter.emit("verify_user", result);

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
		const result = await OTPDao.create(data.email);
		// send otp to email

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
		const result = await OTPDao.findOne(data);
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
		let theUser = await UserDao.findOne({email: data.email});

		if (!theUser) theUser = await UserDao.create({email: data.email});

		// create token and send
		const {token, refreshToken} = tokenizerHelper(theUser.email, theUser._id);

		return {
			status: STATUS.OK_200,
			message: "User is verified",
			error: null,
			token,
			refreshToken,
			result: theUser
		}
	} catch (error) {
		return ERROR(error);
	}
}