const Joi = require("joi");
const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const upload = require("../../../middleware/multer.middleware");

const uploadFile = upload.single("file");

/**
 * ### Vault Middleware
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
 * #### Verify Params user id and query
 * Validate the user id before using it
 */
exports.verify_get_all_user_vault = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			user: Joi.string().alphanum().required()
		});

		const input = {
			user: req.userId
		}

		const { error, value } = schema.validate(input);

		if (error) throw {
			status: STATUS.BAD_REQUEST_400,
			message: "Please check the inputed information and try again!",
			error_code: "V403VGAUV",
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
 * #### Create Vault
 * Validate the vault before creating it
 */
exports.verify_create_vault = (req, res, next) => {
	try {
		uploadFile(req, res, (err) => {
			console.log("file", req.file);
			console.log("body", req.body);

			const schema = Joi.object().keys({
				name: Joi.string().required(),
				user: Joi.string().alphanum().required(),
				file: Joi.object().unknown()
			});

			const input = {
				user: req.userId,
				file: req.file,
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
		});
	} catch (err) {
		return res.status(err.status || STATUS.SERVER_ERR_500).json(ERROR(err));
	}
}

/**
 * ### Vault Middleware
 * #### Update Vault
 * Validate the vault before updateing it
 */
exports.verify_update_vault = (req, res, next) => {
	try {
		const schema = Joi.object().keys({
			name: Joi.string(),
			ben: Joi.object().keys({
				method: Joi.number(),
				beneficiaries: Joi.array()
			}),
			user: Joi.string().alphanum().required(),
			_id: Joi.string().alphanum().required()
		});

		const input = {
			...req.body,
			user: req.userId,
			_id: req.params.id
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