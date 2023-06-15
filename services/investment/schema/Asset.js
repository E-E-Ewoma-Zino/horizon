const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	typeOf: {
		type: String,
		enum: ["bankAccount", "crypto", "realEstate", "Others"],
		required: true,
	},
	name: String,
	value: String,
	bank_account_name: String,
	crypto_wallet_type: String,
	crytocurrency: String,
	crypto_address: String,
	crypto_api_key: String,
	crypto_api_secret: String,
	crypto_file: Object,
	realEstate_addess: String,
	// realEstate_value: {
	//   type: String,
	// },
	realEstate_file: {
		type: String,
	}
}, {timestamps: true});

module.exports = mongoose.model("asset", AssetSchema);