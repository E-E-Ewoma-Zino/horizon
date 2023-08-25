const { authorize_token } = require("../../../middleware/authorizeToken");
const {
	update_beneficiary,
	create_beneficiary,
	get_beneficiary,
	delete_beneficiary,
	get_all_beneficiary
} = require("../controllers");
const { verify_create_beneficiary, verify_update_beneficiary, verifyId, verify_get_all_user_beneficiary } = require("../middlewares");

module.exports = (app) => {
	app.get("/beneficiary-id/:id", authorize_token, verifyId, get_beneficiary);
	app.post("/beneficiary-create", authorize_token, verify_create_beneficiary, create_beneficiary);
	app.put("/beneficiary-update/:id", authorize_token, verify_update_beneficiary, update_beneficiary);
	app.delete("/beneficiary-delete/:id", authorize_token, verifyId, delete_beneficiary);
	app.get("/beneficiary-get-all", authorize_token, verify_get_all_user_beneficiary, get_all_beneficiary);
}