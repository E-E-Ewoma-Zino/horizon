const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assetType: {
    type: String,
    enum: ["bankAccount", "crypto", "realEstate", "Others"],
    required: true,
  },
  assetName: {
    type: String,
  },
  assetValue: {
    type: String,
  },
  bank_account_name: {
    type: String,
  },
  crypto_wallet_type: {
    type: String,
  },
  crytocurrency: {
    type: String,
  },
  crypto_address: {
    type: String,
  },
  crypto_api_key: {
    type: String,
  },
  crypto_api_secret: {
    type: String,
  },
  crypto_file: {
    type: String,
    //buffer?
  },
  realEstate_addess: {
    type: String,
  },
  // realEstate_value: {
  //   type: String,
  // },
  realEstate_file: {
    type: String,
  },

});