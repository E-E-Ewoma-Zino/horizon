const { createToken, createRefreshToken } = require("./jwt.helper");

module.exports = (email, id) => {
	const family = id + '-' + Date.now();

	const token = createToken(email, id, family);
	const refreshToken = createRefreshToken(email, id, family);

	return {
		token,
		refreshToken
	}
}