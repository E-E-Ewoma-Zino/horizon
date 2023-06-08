const { create_beneficiary_factory, update_beneficiary_factory, get_beneficiary_factory } = require("../factory");

/**
 * ### Beneficiaries Controller
 * #### Create A Beneficiary
 * Use the data contained in the req.body to create a beneficiary
 */
exports.create_beneficiary = async (req, res) => {
	const { status, ...more } = await create_beneficiary_factory(req.body);
	res.status(status).json({ status, more });
}

/**
 * ### Beneficiaries Controller
 * #### Update A Beneficiary
 * Use the request data to update the beneficiary
 */
exports.update_beneficiary = async (req, res) => {
	const { status, ...more } = await update_beneficiary_factory(req.body);
	res.status(status).json({ status, more });
}

/**
 * ### Beneficiaries Controller
 * #### Get A Beneficiary 
 * Use the data contained in the req.body to create a beneficiary
 */
exports.get_beneficiary = async (req, res) => {
	const { status, ...more } = await get_beneficiary_factory(req.body);
	res.status(status).json({ status, more });
}