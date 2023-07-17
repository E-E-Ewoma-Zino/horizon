const STATUS = require("../../../constants/status.constants");
const { verify_user_factory, verify_otp_factory } = require("../factory");

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