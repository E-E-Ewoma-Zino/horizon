const Joi = require("joi");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");

/**
 * ### Beneficiaries Middleware
 * #### Verify Params Id
 * Validate the id before using it
 */
exports.verifyId = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required()
		});

		const input = {
			_id: req.params.id
		}

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VID",
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
 * ### Beneficiaries Middleware
 * #### Verify Params user id and query
 * Validate the user id before using it
 */
exports.verify_get_all_user_beneficiary = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			user: Joi.string().alphanum().required()
		}).unknown(true);

		const input = {
			user: req.params.id,
			...req.query
		}

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VID",
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
 * ### Beneficiaries Middleware
 * #### Create Beneficiaries
 * Validate the beneficiary before creating it
 */
exports.verify_create_beneficiary = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			user: Joi.string().required(),
			phone: Joi.string(),
			isTrustee: Joi.boolean()
		});

		const input = {
			// This user will change to req.user
			user: req.body.user,
			...req.body
		}
		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VCB",
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
 * ### Beneficiaries Middleware
 * #### Update Beneficiaries
 * Validate the beneficiary before updateing it
 */
exports.verify_update_beneficiary = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			isTrustee: Joi.boolean(),
			user: Joi.string().alphanum().required(),
			_id: Joi.string().alphanum().required(),
		});

		const input = {
			isTrustee: req.body.isTrustee,
			user: req.body.user,
			_id: req.params.id
		};

		const { error, value } = schema.validate(input);

		if (error)
			throw {
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