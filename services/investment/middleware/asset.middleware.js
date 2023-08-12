const Joi = require("joi");
const ERROR = require("../../../constants/error.constant");
const MONETARY_UNIT = require("../constants/monetaryUnit");
const STATUS = require("../../../constants/status.constants");
const currencyConverter = require("./helper/currencyConverter");

/**
 * ### Assets Middleware
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
			result: value
		}

		req.body = value;
		return next();
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

//CREATES ASSET BASED ON ASSET TYPE
exports.verify_general_create_asset = async (req, res, next) => {
	try {
		const schema = Joi.object({
			user: Joi.string().alphanum().required(),
			typeOf: Joi.string().required(),
			value: Joi.number(),
			okra: Joi.object(),
			valueUSD: Joi.number(),
			currency_type: Joi.string(),
			bank_bvn_number: Joi.number(),
			bank_account_number: Joi.number(),
			bank_account_name: Joi.string(),
			bank_name: Joi.string(),
			crypto_wallet_type: Joi.string(),
			crypto_address: Joi.string(),
			crypto_api_key: Joi.string().alphanum(),
			crypto_api_secret: Joi.string().alphanum(),
			realEstate_addess: Joi.string(),
			file: Joi.object(),
		});

		const input = {
			...req.body,
			file: req.body.file
		};

		console.log("user", req.body);

		// also check if okra is present in the object. if it is then there is no more need for manual method
		if(!input.okra) {
			// convert value
			input.valueUSD = await currencyConverter(req.body.value, req.body.currency_type)
			
			if(input.typeOf !== "crypto") {
				input.value = req.body.value * MONETARY_UNIT[req.body.currency_type];
			}
		}
		
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


//UPDATE ASSET BASED ON ID
exports.verify_general_asset_update = async (req, res, next) => {
	try {
		const schema = Joi.object({
			_id: Joi.string().alphanum(),
			value: Joi.number(),
			currency_type: Joi.string(),
			bank_bvn_number: Joi.number(),
			okra: Joi.object(),
			bank_account_number: Joi.number(),
			valueUSD: Joi.number(),
			bank_account_name: Joi.string(),
			bank_name: Joi.string(),
			crypto_wallet_type: Joi.string(),
			crytocurrency: Joi.string(),
			crypto_address: Joi.string(),
			crypto_api_key: Joi.string().alphanum(),
			crypto_api_secret: Joi.string().alphanum(),
			realEstate_addess: Joi.string(),
			file: Joi.object()
		});

		const updated_data = {
			...req.body,
			_id: req.params.id,
			value: req.body.typeOf !== "crypto"? await currencyConverter(req.body.value, req.body.currency_type): req.body.value,
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