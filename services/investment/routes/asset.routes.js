const {
	verifyId,
	verify_general_create_asset,
	verify_general_asset_update,
	verify_get_all_user_asset,
} = require("../middleware/asset.middleware");
const {
	create_asset,
	update_asset,
	delete_asset,
	get_all_asset,
	get_one_asset,
	asset_details,
	vezgo_auth,
} = require("../controllers/asset.controllers");
const { authorize_token } = require("../../../middleware/authorizeToken");

module.exports = (app) => {
	app.get("/asset-id/:id", authorize_token, verifyId, get_one_asset);
	app.get("/asset", authorize_token, verify_get_all_user_asset, asset_details);
	app.post("/asset-create", authorize_token, verify_general_create_asset, create_asset);
	//	app.put("/asset-update/:id", verify_general_asset_update, update_asset);
	app.delete("/asset-delete/:id", authorize_token, verifyId, delete_asset);
	app.get("/asset-get-all", authorize_token, verify_get_all_user_asset, get_all_asset);
	app.post("/asset/vezgo/auth", authorize_token, vezgo_auth);
};