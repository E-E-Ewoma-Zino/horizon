const {verifyId, verify_general_create_asset, verify_general_asset_update, verify_get_all_user_asset} = require('../middleware/asset.middleware');
const {
  create_asset,
  update_asset,
  delete_asset,
  get_all_asset,
  get_one_asset,
} = require("../controllers/asset.controllers");

module.exports = (app) => {
  app.get("/asset-id/:id", verifyId, get_one_asset);
  app.post("/asset-create", verify_general_create_asset, create_asset);
  app.put("/asset-update/:id", verify_general_asset_update, update_asset);
  app.delete("/asset-delete/:id", verifyId, delete_asset);
  app.get("/asset-get-all/:id", verify_get_all_user_asset, get_all_asset);
};