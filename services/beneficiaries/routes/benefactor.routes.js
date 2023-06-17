const {
  update_beneficiary,
  create_beneficiary,
  get_beneficiary,
  delete_beneficiary,
  get_all_beneficiary,
  create_user,
} = require("../controllers");
const { verify_create_beneficiary, verify_update_beneficiary, verifyId, verify_get_all_user_beneficiary } = require("../middlewares");

module.exports = (app) => {
	app.get("/beneficiary-id/:id", verifyId, get_beneficiary);
	app.post("/beneficiary-create", verify_create_beneficiary, create_beneficiary);
	app.put("/beneficiary-update/:id", verify_update_beneficiary, update_beneficiary);
	app.delete("/beneficiary-delete/:id", verifyId, delete_beneficiary);
	app.get("/beneficiary-get-all/:id", verify_get_all_user_beneficiary, get_all_beneficiary);
	app.post("/create-user", create_user);
}