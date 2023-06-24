const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: String,
	isTrustee: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("beneficiary", BeneficiarySchema);
