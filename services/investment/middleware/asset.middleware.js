const Joi = require("joi");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");

/**
 * ### Assets Middleware
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

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VID",
			error: error,
			result: value
		}

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

/**
 * ### Assets Middleware
 * #### Verify the create asset data
 * CREATES ASSET BASED ON ASSET TYPE
 */
exports.verify_general_create_asset = async (req, res, next) => {
	try {
		const schema = Joi.object({
			user: Joi.string().alphanum().required(),
			typeOf: Joi.string().required(),
			value: Joi.number(),
			bank: Joi.object(),
			crypto: Joi.object(),
			currency_type: Joi.string(),
			realEstate_addess: Joi.string(),
			file: Joi.object(),
		});

		const input = {
			...req.body,
			user: req.userId,
			file: req.body.file
		};

		console.log("body", req.body);
		
		const { value, error } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VUL",
			error: error,
			result: value,
		};

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
};

/**
 * ### Assets Middleware
 * #### Verify update asset data
 * UPDATE ASSET BASED ON ID
 * @deprecated Asset should no longer be updated
*/
exports.verify_general_asset_update = async (req, res, next) => {
	try {
		const schema = Joi.object({
			_id: Joi.string().alphanum(),
			user: Joi.string().alphanum().required(),
			typeOf: Joi.string().required(),
			value: Joi.number(),
			bank: Joi.object(),
			crypto: Joi.object(),
			currency_type: Joi.string(),
			realEstate_addess: Joi.string(),
			file: Joi.object(),
		});

		const updated_data = {
			...req.body,
			user: req.userId,
			file: req.body.file
		};

		const { value, error } = schema.validate(updated_data);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VUL",
			error: error,
			result: value
		};

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}


/**
 * ### Assets Middleware
 * #### Verify Params user id and query
 * Validate the user id before using it
 */
exports.verify_get_all_user_asset = (req, res, next) => {
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