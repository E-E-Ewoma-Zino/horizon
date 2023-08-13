const { authorize_token } = require("../../../middleware/authorizeToken");
const { verify_user, verify_otp, access_vault, set_vault_pin, forgot_vault_pin } = require("../controllers");
const { verify_email, verify_OTP, verify_vault } = require("../middlewares");

module.exports = (app) => {
	// @desc	Verify the email send by an user and send an otp
	app.post("/verify-email", verify_email, verify_user);

	// @desc	Verify the OTP sent by the user
	app.post("/verify-otp", verify_OTP, verify_otp);

	// @desc	Use this route to access the users vault
	app.post("/vault", authorize_token, verify_vault, access_vault);

	// @desc	Use this route to set a users vault pin
	app.post("/vault-init", authorize_token, verify_vault, set_vault_pin);
	
	// @desc	Use this route to resset a users vault pin
	app.post("/vault-forgot-pin", authorize_token, verify_email, forgot_vault_pin);
}