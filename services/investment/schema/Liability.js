// This script contains the schema structure for Liabilities
const mongoose = require("mongoose");

const LiabilitySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		require: true
	},
	typeOf: {
		type: String,
		required: true,
		enum: ["loans", "mortgage", "people", "others"]
	},

	// All Liabilities contains similar requirement, just differs with naming
	balance: Number,
	paymentBalance: Number,
	currency: String,
	address: String,
	percentage: Number,
	dueDate: Date,
	document: Object,

}, {timestamps: true});

module.exports = mongoose.model("Liability", LiabilitySchema);