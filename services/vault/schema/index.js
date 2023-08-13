const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema({
	name: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	file: {
		type: Object,
		required: true
	},
	note: String,
	beneficiaries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "beneficiary"
	}]
});

module.exports = mongoose.model("vault", vaultSchema);
