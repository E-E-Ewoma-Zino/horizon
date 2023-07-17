const jwt = require('jsonwebtoken');
const settings = require('../config');

exports.createOtp = () => {
	return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

exports.createToken = (email, userId, family) => {
	return jwt.sign({ email, userId, family }, settings.tokenSecret, { algorithm: 'HS256', expiresIn: "30s" });
}

exports.createRefreshToken = (email, userId, family) => {
	return jwt.sign({ email, userId, family }, settings.refreshTokenSecret, { algorithm: 'HS256', expiresIn: "1m" });
}


// create refresh token 