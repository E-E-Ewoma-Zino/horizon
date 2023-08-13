const { createToken, createRefreshToken, createVaultToken } = require("./jwt.helper");

module.exports = (email, id) => {
	const family = id + '-' + Date.now();

	const token = createToken(email, id, family);
	const refreshToken = createRefreshToken(email, id, family);
	const vaultToken = createVaultToken(email, id);

	return {
		token,
		vaultToken,
		refreshToken
	}
}