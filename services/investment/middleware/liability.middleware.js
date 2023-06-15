const Joi = require("joi");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");

/**
 * ### Liabilities Middleware
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
			err: error,
			result: null
		}

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

/**
 * ### Liabilities Middleware
 * #### Create Liabilities
 * Validate the liability before creating it
 */
exports.verify_create_liability = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			user: Joi.string().alphanum().required(),
			typeOf: Joi.string().required(),
			balance: Joi.number().required(),
			paymentBalance: Joi.number().required(),
			currency: Joi.string().required(),
			address: Joi.string(),
			percentage: Joi.number(),
			dueDate: Joi.date().required(),
			document: Joi.object()
		});

		const input = {
			...req.body,
			document: req.files
		}

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VCL",
			err: error,
			result: null
		}

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

/**
 * ### Liabilities Middleware
 * #### Update Liabilities
 * Validate the liability before updateing it
 */
exports.verify_update_liability = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			user: Joi.string().alphanum().required(),
			typeOf: Joi.string().required(),
			balance: Joi.number().required(),
			paymentBalance: Joi.number().required(),
			currency: Joi.string().required(),
			address: Joi.string(),
			percentage: Joi.number(),
			dueDate: Joi.date().required(),
			document: Joi.object()
		});

		// add user: req.userId after user Auth is made
		const input = {
			...req.body,
			document: req.files
		}

		const { error, value } = schema.validate(input);

		if (error)
			throw {
				status: STATUS.BAD_REQUEST_400,
				message: "Please check the inputed information and try again!",
				error_code: "V403VUL",
				err: error,
				result: null,
			};

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}