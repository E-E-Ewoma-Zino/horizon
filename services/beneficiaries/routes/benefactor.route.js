const { update_beneficiary, create_beneficiary, get_beneficiary } = require("../controllers");
const { verify_create_beneficiary, verify_update_beneficiary, verifyId } = require("../middlewares");

module.exports = (app) => {
	app.get("/beneficiary-id/:id", verifyId, get_beneficiary);
	app.post("/beneficiary-create", verify_create_beneficiary, create_beneficiary);
	app.put("/beneficiary-update/:id", verify_update_beneficiary, update_beneficiary);
}