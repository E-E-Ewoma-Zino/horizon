const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		// required: true,
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
	isTrustee: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("beneficiary", BeneficiarySchema);
