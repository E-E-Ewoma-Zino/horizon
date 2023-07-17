const { verify_user, verify_otp } = require("../controllers");
const { verify_email, verify_OTP } = require("../middlewares");

module.exports = (app) => {
	// @desc	Verify the email send by an user and send an otp
	app.post("/verify-email", verify_email, verify_user);

	// @desc	Verify the OTP sent by the user
	app.post("/verify-otp", verify_OTP, verify_otp);
}