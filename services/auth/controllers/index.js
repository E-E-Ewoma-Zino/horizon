const STATUS = require("../../../constants/status.constants");
const { verify_user_factory, verify_otp_factory, set_vault_pin_factory, access_vault_factory, forgot_vault_pin_factory } = require("../factory");

/**
 * ### Auth Controller
 * #### Verify A User's Email
 * Use the data contained in the req.body to create a beneficiary
 */
exports.verify_user = async (req, res) => {
	try {
		const { status, ...more } = await verify_user_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Auth Controller
 * #### Verify A User's OTP
 * Use the data contained in the req.body to create a beneficiary
 */
exports.verify_otp = async (req, res) => {
	try {
		const { status, ...more } = await verify_otp_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Set a User's Vault pin
 * Use this controller to set new vault pin or change vault pin
 */
exports.set_vault_pin = async (req, res) => {
	try {
		const { status, ...more } = await set_vault_pin_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Access User's Vault
 * Use this controller to access user's vault
 */
exports.access_vault = async (req, res) => {
	try {
		const { status, ...more } = await access_vault_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Reset User's Vault Pin
 * Use this controller to access user's vault
 */
exports.forgot_vault_pin = async (req, res) => {
	try {
		const { status, ...more } = await forgot_vault_pin_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}