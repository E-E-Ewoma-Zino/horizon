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

		const {error, value} = schema.validate(input);

		if(error) throw {
			status:  STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VCB",
			err: error,
			result: null
		}

		req.body = value;
		return next();
	}catch(err) {
		return res.status(err.status || 500).json(ERROR(err));
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
			isTrustee: Joi.boolean()
		});

		const {error, value} = schema.validate(req.body);

		if(error) throw {
			status:  STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VCB",
			err: error,
			result: null
		}

		req.body = value;
		return next();
	}catch(err) {
		return res.status(err.status || 500).json(ERROR(err));
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
      name: Joi.string(),
      email: Joi.string().email(),
      isTrustee: Joi.boolean(),
      _id: Joi.string().alphanum().required(),
    });

    const input = {
      ...req.body,
      _id: req.params.id,
    };

    const { error, value } = schema.validate(input);

    if (error)
      throw {
        status: STATUS.BAD_REQUEST_400,
        message: "Please check the inputed information and try again!",
        error_code: "V403VCB",
        err: error,
        result: null,
      };

    req.body = value;
    return next();
  } catch (err) {
    return res.status(err.status || 500).json(ERROR(err));
  }
  
}