const jwt = require("jsonwebtoken");
const settings = require("../config");
const tokenizerHelper = require("../helper/tokenizer.helper");
// Verify tokens here

/**
 * ### Auth Middleware
 * Verify a user is authorized
 */
exports.authorize_token = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		res.status(499).json({ status: 499, message: "Provide a valid token" })
	} else {
		jwt.verify(token, settings.tokenSecret, { algorithm: 'HS256' }, (error, unlocked) => {
			if (error) {
				if (error.name === 'TokenExpiredError') {
					refreshToken(req, res, next);
				} else {
					res.status(500).json({ status: 500, message: 'Failed to authenticate token', error: error.message })
				}
				//
			} else {
				req.userId = unlocked.userId;
				req.email = unlocked.email;
				next();
			}
		});
	}
}

/**
 * ### Auth Middleware
 * If user token is expired refresh it
 */
async function refreshToken(req, res, next) {
	try {
		let refreshToken = req.headers.refreshtoken;

		if (!refreshToken) {
			return res.status(403).json({ status: 403, message: 'Failed to authenticate token', error: "NO_TOKEN_PROVIDED" });
		}

		const unlockedRefresh = await new Promise((resolve, reject) => {
			jwt.verify(refreshToken, settings.refreshTokenSecret, { algorithm: 'HS256' }, (error, unlocked) => {
				if (error) {
					reject(error);
				} else {
					resolve(unlocked);
				}
			});
		});

		// Decode the access token and extract the payload data
		const accessToken = req.headers.authorization;
		const [, payloadBase64] = accessToken.split('.');
		const decodedPayload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));

		// Check if the family field of both payloads match
		if (unlockedRefresh.family !== decodedPayload.family) {
			return res.status(498).json({ error: "Invalid Token", message: "Token family mismatch", status: 498 });
		}

		const { token: newAccessToken, refreshToken: newRefreshToken } = tokenizerHelper(unlockedRefresh.email, unlockedRefresh.userId);
				
		req.newAccessToken = newAccessToken;
		req.newRefreshToken = newRefreshToken;

		req.userId = unlockedRefresh.userId;
		req.username = unlockedRefresh.email;

		next();

	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) return res.status(498).json({ status: 498, error: "Invalid Token", message: error.message });
		return res.status(500).json({ status: 500, message: error.message });
	}
}