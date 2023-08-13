const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstname: String,
	lastname: String,
	accountNo: Number,
	vault_pin: String
});

module.exports = mongoose.model("user", UserSchema);