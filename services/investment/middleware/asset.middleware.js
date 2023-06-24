const Joi = require("joi");
const Converter = require("currency-converter-lt");
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
exports.verify_general_create_asset = (req, res, next) => {
	try {
		const schema = Joi.object({
      user: Joi.string().alphanum().required(),
      typeOf: Joi.string().required(),
      value: Joi.number(),
      currency_type: Joi.string(),
      bank_bvn_number: Joi.number(),
      bank_account_number: Joi.number(),
      bank_account_name: Joi.string(),
      bank_name: Joi.string(),
      crypto_wallet_type: Joi.string(),
      crytocurrency: Joi.string(),
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
exports.verify_general_asset_update = (req, res, next) => {
	try {
		const schema = Joi.object({
			_id: Joi.string().alphanum(),
			value: Joi.number(),
			currency_type: Joi.string(),
			bank_bvn_number: Joi.number(),
			bank_account_number: Joi.number(),
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
			file: req.body.file
		};

		const { value, error } = schema.validate(updated_data);

		if (error)
			throw {
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

//Currency Convertor
exports.currencyConverter = async (req, res, next) => {
  // Check if the request contains the necessary data for currency conversion
  if (req.body.currency_type && req.body.value) {
    const currency_type = req.body.currency_type;
    const value = req.body.value;

    try {
      let convertedAmount;
	  const converter = new Converter();

      // Perform currency conversion based on the currency type
      if (currency_type === "USD") {
        // Convert USD to cents
        const result = await converter.convert(value).from("USD").to("cents");
        convertedAmount = result.value;
      } else if (currency_type === "NGN") {
        // Convert NAIRA to kobo
        const result = await converter.convert(value).from("NGN").to("kobo");
        convertedAmount = result.value;
      } else {
        // Invalid currency type
        return res.status(400).json({ error: "Invalid currency type" });
      }

      // Update the request body with the converted amount
      req.body.value = convertedAmount;
    } catch (error) {
      // Handle any errors from the currency conversion library
      return res.status(500).json({ error: "Currency conversion failed" });
    }
  }

  // Proceed to the next middleware or route handler
  return next();
};