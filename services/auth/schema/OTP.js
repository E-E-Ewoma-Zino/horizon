const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	otp: {
		type: String,
		required: true
	},
	use: {
		type: String,
		enum: ["VAULT", "AUTH"],
		required: true
	}
});

module.exports = mongoose.model("otp", OTPSchema);