const Joi = require("joi");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");

/**
 * ### Auth Middleware
 * #### Verify Email
 * Validate the email before using it
 */
exports.verify_email = (req, res, next) => {
	console.log("body", req.body);
	try {
		const schema = Joi.object().keys({
			email: Joi.string().email().required()
		});

		const input = { email: req.body?.email?.toLowerCase()};

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "M400V",
			error: error,
			result: null
		}

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

/**
 * ### Auth Middleware
 * #### Verify OTP
 * Validate the OTP before using it
 */
exports.verify_OTP = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			otp: Joi.number().required(),
			email: Joi.string().email().required()
		});

		const input = { ...req.body, email: req.body?.email?.toLowerCase() };

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "M400V",
			error: error,
			result: null
		}

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

/**
 * ### Vault Middleware
 * #### Vault Auth
 * Validate the user can access this vault
 */
exports.verify_vault = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			pin: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
			user: Joi.string().alphanum().required(),
			email: Joi.string().email(),
			otp: Joi.number()
		});

		const input = {
			...req.body,
			email: req.body?.email?.toLowerCase(),
			user: req.userId
		};

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VUB",
			error: error,
			result: null,
		};

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}