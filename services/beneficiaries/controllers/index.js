const STATUS = require("../../../constants/status.constants");
const {
	create_beneficiary_factory,
	update_beneficiary_factory,
	get_beneficiary_factory,
	delete_beneficiary_factory,
	get_all_beneficiary_factory
} = require("../factory");

/**
 * ### Beneficiaries Controller
 * #### Create A Beneficiary
 * Use the data contained in the req.body to create a beneficiary
 */
exports.create_beneficiary = async (req, res) => {
	try {
		const { status, ...more } = await create_beneficiary_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Beneficiaries Controller
 * #### Update A Beneficiary
 * Use the request data to update the beneficiary
 */
exports.update_beneficiary = async (req, res) => {
	try {
		const { status, ...more } = await update_beneficiary_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Beneficiaries Controller
 * #### Get A Beneficiary 
 * Use the data contained in the req.body to get a beneficiary
 */
exports.get_beneficiary = async (req, res) => {
	try {
		const { status, ...more } = await get_beneficiary_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Beneficiaries Controller
 * #### Delete A Beneficiary 
 * Use the data contained in the req.body to Delete a beneficiary
 */

exports.delete_beneficiary = async (req, res) => {
	try {
		const { status, ...more } = await delete_beneficiary_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Beneficiaries Controller
 * #### Get All Beneficiary Associated with a User 
 * Use the data contained in the req.params.id to get all beneficiary's
 */

exports.get_all_beneficiary = async (req, res) => {
	try {
		const { status, ...more } = await get_all_beneficiary_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch (error) {
		console.error("Error in controller");
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}