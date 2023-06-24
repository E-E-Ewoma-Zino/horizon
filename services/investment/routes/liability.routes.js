const { get_liability, create_liability, update_liability, delete_liability, get_all_liability, liability_details } = require("../controllers/liability.controllers");
const { verifyId, verify_create_liability, verify_update_liability, verify_get_all_user_liabilities } = require("../middleware/liability.middleware");

module.exports = (app) => {
	app.get("/liability-id/:id", verifyId, get_liability);
	app.post("/liability-create", verify_create_liability, create_liability);
	// app.put("/liability-update/:id", verify_update_liability, update_liability);
	app.get("/liability/:id", verify_get_all_user_liabilities, liability_details);
	app.delete("/liability-delete/:id", verifyId, delete_liability);
	app.get("/liability-get-all/:id", verify_get_all_user_liabilities, get_all_liability);
}