const { get_liability, create_liability, update_liability, delete_liability, get_all_liability, liability_details } = require("../controllers/liability.controllers");
const { verifyId, verify_create_liability, verify_update_liability, verify_get_all_user_liabilities } = require("../middleware/liability.middleware");
const { authorize_token } = require("../../../middleware/authorizeToken");

module.exports = (app) => {
	app.get("/liability-id/:id", authorize_token, verifyId, get_liability);
	app.post("/liability-create", authorize_token, verify_create_liability, create_liability);
	// app.put("/liability-update/:id", authorize_token, verify_update_liability, update_liability);
	app.get("/liability", authorize_token, verify_get_all_user_liabilities, liability_details);
	app.delete("/liability-delete/:id", authorize_token, verifyId, delete_liability);
	app.get("/liability-get-all", authorize_token, verify_get_all_user_liabilities, get_all_liability);
}