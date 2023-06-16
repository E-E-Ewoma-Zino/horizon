const {verifyId, verify_general_create_asset, verify_general_asset_update} = require('../middleware/asset.middleware');
const {
  create_asset,
  update_asset,
  delete_asset,
  getall_asset,
  get_one_asset,
} = require("../controllers/asset.controllers");



module.exports = (app) => {
  app.get("/Asset-id/:id", verifyId, get_one_asset);
  app.post("/Asset-create", verify_general_create_asset, create_asset);
  app.put("/Asset-update/:id", verify_general_asset_update, update_asset);
  app.post("/Asset-delete/:id", verifyId, delete_asset);
  app.get("/Asset-get-all/:id", verifyId, getall_asset);
};