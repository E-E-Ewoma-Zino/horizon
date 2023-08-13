const STATUS = require("../../../constants/status.constants");
const {
	create_vault_factory,
	update_vault_factory,
	get_vault_factory,
	delete_vault_factory,
	get_all_vault_factory,
	create_user_factory,
} = require("../factory");

/**
 * ### Vault Controller
 * #### Create A Beneficiary
 * Use the data contained in the req.body to create a vault
 */
exports.create_vault = async (req, res) => {
	try {
		const { status, ...more } = await create_vault_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Create A Beneficiary
 * Use the data contained in the req.body to create a vault
 */
exports.create_user = async (req, res) => {
	try {
		const { status, ...more } = await create_user_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Update A Beneficiary
 * Use the request data to update the vault
 */
exports.update_vault = async (req, res) => {
	try {
		const { status, ...more } = await update_vault_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Get A Beneficiary 
 * Use the data contained in the req.body to get a vault
 */
exports.get_vault = async (req, res) => {
	try {
		const { status, ...more } = await get_vault_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Delete A Beneficiary 
 * Use the data contained in the req.body to Delete a vault
 */
exports.delete_vault = async (req, res) => {
	try {
		const { status, ...more } = await delete_vault_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Vault Controller
 * #### Get All Beneficiary Associated with a User 
 * Use the data contained in the req.params.id to get all vault's
 */
exports.get_all_vault = async (req, res) => {
	try {
		const { status, ...more } = await get_all_vault_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}