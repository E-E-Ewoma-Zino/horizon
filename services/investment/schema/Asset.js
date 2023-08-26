const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	typeOf: {
		type: String,
		enum: ["bank", "crypto", "realEstate", "others"],
		required: true,
	},
	bank: Object,
	crypto: Object,
	name: String,
	value: Number,
	currency_type: String,
	file: Object,
	realEstate_addess: String,
}, { timestamps: true });

module.exports = mongoose.model("asset", AssetSchema);