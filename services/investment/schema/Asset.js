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
  bank_account_number: String,
  bank_bvn_number: String,
  bank_name: String,
	crypto_wallet_type: String,
	crytocurrency: String,
	crypto_address: String,
	crypto_api_key: String,
	crypto_api_secret: String,
	file: Object,
	realEstate_addess: String,
	// realEstate_value: {
	//   type: String,
	// }
}, {timestamps: true});

module.exports = mongoose.model("asset", AssetSchema);