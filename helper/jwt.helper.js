const jwt = require('jsonwebtoken');
const settings = require('../config');

exports.createOtp = () => {
	return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

exports.createToken = (email, userId, family) => {
	return jwt.sign({ email, userId, family }, settings.tokenSecret, { algorithm: 'HS256', expiresIn: "5h" });
}

exports.createRefreshToken = (email, userId, family) => {
	return jwt.sign({ email, userId, family }, settings.refreshTokenSecret, { algorithm: 'HS256', expiresIn: "1h" });
}

exports.createVaultToken = (email, userId) => {
	return jwt.sign({ email, userId }, settings.vaultTokenSecret, { algorithm: 'HS256', expiresIn: "5m" });
}