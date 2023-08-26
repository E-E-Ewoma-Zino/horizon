const Joi = require("joi");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const currencyConverter = require("./helper/currencyConverter");

/**
 * ### Liabilities Middleware
 * #### Verify Params Id
 * Validate the id before using it
 */
exports.verifyId = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required(),
			user: Joi.string().alphanum().required()
		});

		const input = {
			_id: req.params.id,
			user: req.userId
		}

		console.log("user", req.userId);

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
 * ### Liabilities Middleware
 * #### Create Liabilities
 * Validate the liability before creating it
 */
exports.verify_create_liability = async (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			user: Joi.string().alphanum().required(),
			typeOf: Joi.string().required(),
			bank: Joi.object(),
			balance: Joi.number().required(),
			valueUSD: Joi.number(),
			paymentBalance: Joi.number().required(),
			currency: Joi.string().required(),
			address: Joi.string(),
			percentage: Joi.number(),
			dueDate: Joi.date().required(),
			document: Joi.object()
		});

		const input = {
			...req.body,
			user: req.userId,
			document: req.body.file
		};

		// if bank is not provided then it is a manual input. So convert the value to the lowest value
		if (!input.bank) {
			input.balance = req.body.balance * MONETARY_UNIT[req.body.currency],
			input.valueUSD = await currencyConverter(req.body.balance, req.body.currency)
		}

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VCL",
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
 * ### Liabilities Middleware
 * #### Update Liabilities
 * Validate the liability before updateing it
 * @deprecated Liabilities should no longer be updated
 */
exports.verify_update_liability = async (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			_id: Joi.string().alphanum().required(),
			typeOf: Joi.string().required(),
			balance: Joi.number().required(),
			valueUSD: Joi.number(),
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
			document: req.body.file,
			balance: req.body.balance * MONETARY_UNIT[req.body.currency],
			valueUSD: await currencyConverter(req.body.balance, req.body.currency)
		};

		const { error, value } = schema.validate(input);

		if (error)
			throw {
				status: STATUS.BAD_REQUEST_400,
				message: "Please check the inputed information and try again!",
				error_code: "V403VUL",
				error: error,
				result: null,
			};

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

/**
 * ### Liabilities Middleware
 * #### Verify Params user id and query
 * Validate the user id before using it
 */
exports.verify_get_all_user_liabilities = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			user: Joi.string().alphanum().required()
		}).unknown(true);

		const input = {
			user: req.userId,
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