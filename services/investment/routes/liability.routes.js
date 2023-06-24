const { get_liability, create_liability, update_liability, delete_liability, get_all_liability } = require("../controllers/liability.controllers");
const { verifyId, verify_create_liability, verify_update_liability, verify_get_all_user_liabilities } = require("../middleware/liability.middleware");

module.exports = (app) => {
	app.get("/Liability-id/:id", verifyId, get_liability);
	app.post("/Liability-create", verify_create_liability, create_liability);
	app.put("/Liability-update/:id", verify_update_liability, update_liability);
	app.delete("/Liability-delete/:id", verifyId, delete_liability);
	app.get("/Liability-get-all/:id", verify_get_all_user_liabilities, get_all_liability);
}