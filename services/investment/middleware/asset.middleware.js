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


//CREATES ASSET BASED ON ASSET TYPE
exports.verify_general_create_asset = (req, res, next) => {
  try {
    const schema = Joi.object({
      user: Joi.string().alphanum().required(),
      typeof: Joi.string().required(),
      value: Joi.number(),
      bank_bvn_number: Joi.number().min(11).max(11),
      bank_account_number: Joi.number().min(10).max(10),
      bank_account_name: Joi.string(),
      bank_name: Joi.string(),
      crypto_wallet_type: Joi.string(),
      crytocurrency: Joi.string(),
      crypto_address: Joi.string(),
      crypto_api_key: Joi.string().number(),
      crypto_api_secret:Joi.string().number(),
      crypto_file: Joi.string().regex("/.pdf$/"),
      realEstate_addess: Joi.string(),
      realEstate_file: Joi.string().regex("/pdf$/"),
    });

    const created_data = {
      ...req.body,
      crypto_file: req.body.file,
      realEstate_file: req.body.file,
    };

    const { result, error } = schema.validate(created_data);

    if (error)
      throw {
        status: STATUS.BAD_REQUEST_400,
        message: "Please check the inputed information and try again!",
        error_code: "V403VUL",
        err: error,
        result: null,
      };

    req.body = result;
    return next();
  } catch (err) {
    return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
  }
};



//UPDATE ASSET BASED ON ID
exports.verify_general_asset_update = (req, res, next) => {
    try {
        const schema = Joi.object({
          //   user: Joi.string().alphanum().required(),
          typeof: Joi.string().required(),
          value: Joi.number(),
          bank_bvn_number: Joi.number().min(11).max(11),
          bank_account_number: Joi.number().min(10).max(10),
          bank_account_name: Joi.string(),
          bank_name: Joi.string(),
          crypto_wallet_type: Joi.string(),
          crytocurrency: Joi.string(),
          crypto_address: Joi.string(),
          crypto_api_key: Joi.string().number(),
          crypto_api_secret: Joi.string().number(),
          crypto_file: Joi.string().regex("/.pdf$/"),
          realEstate_addess: Joi.string(),
          realEstate_file: Joi.string().regex("/pdf$/"),
        });

        const updated_data = {
          ...req.body,
          crypto_file: req.body.file,
          realEstate_file: req.body.file,
        };

        const {result, error} = schema.validate(updated_data);

        if (error)
          throw {
            status: STATUS.BAD_REQUEST_400,
            message: "Please check the inputed information and try again!",
            error_code: "V403VUL",
            err: error,
            result: null,
          };

        req.body = result;
    } catch (err) {
      return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
    }
}
