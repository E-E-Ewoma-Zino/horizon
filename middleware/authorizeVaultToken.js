const jwt = require("jsonwebtoken");
const settings = require("../config");
const STATUS = require("../constants/status.constants");
// Verify tokens here

/**
 * ### Auth Middleware
 * Verify a user has access to a vault 
 */
exports.authorize_vault_token = async (req, res, next) => {
	const vToken = req.headers.vaulttoken;

	if (!vToken) {
		res.status(STATUS.MISSING_TOKEN_499).json({ status: STATUS.MISSING_TOKEN_499, message: "Provide a valid vToken", error: "NO_TOKEN_PROVIDED" });
	} else {
		jwt.verify(vToken, settings.vaultTokenSecret, { algorithm: 'HS256' }, (error, unlocked) => {
			if (error) {
				if (error.name === 'TokenExpiredError') {
					res.status(STATUS.INVALID_TOKEN_498).json({ status: STATUS.INVALID_TOKEN_498, message: "This vToken is expired", error: error.message });
				} else {
					res.status(STATUS.SERVER_ERR_500).json({ status: STATUS.SERVER_ERR_500, message: 'Failed to authenticate token', error: error.message });
				}
			} else {
				next();
			}
		});
	}
}