const {
	update_vault,
	create_vault,
	get_vault,
	delete_vault,
	get_all_vault
} = require("../controllers");
const { authorize_token } = require("../../../middleware/authorizeToken");
const { authorize_vault_token } = require("../../../middleware/authorizeVaultToken");
const { verify_create_vault, verify_update_vault, verifyId, verify_get_all_user_vault} = require("../middlewares");

module.exports = (app) => {
	app.get("/vault-id/:id", authorize_token, authorize_vault_token, verifyId, get_vault);
	app.delete("/vault-delete/:id", authorize_token, authorize_vault_token, verifyId, delete_vault);
	app.post("/vault-create", authorize_token, authorize_vault_token, verify_create_vault, create_vault);
	app.put("/vault-update/:id", authorize_token, authorize_vault_token, verify_update_vault, update_vault);
	app.get("/vault-get-all", authorize_token, authorize_vault_token, verify_get_all_user_vault, get_all_vault);
}