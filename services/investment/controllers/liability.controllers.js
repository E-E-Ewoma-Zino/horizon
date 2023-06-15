const STATUS = require("../../../constants/status.constants");
const { create_liability_factory, update_liability_factory, get_liability_factory, delete_liability_factory, get_all_liability_factory } = require("../factory/liability.factory");

/**
 * ### Liabilities Controller
 * #### Create A Liability
 * Use the data contained in the req.body to create a liability
 */
exports.create_liability = async (req, res) => {
	try{
		const { status, ...more } = await create_liability_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch(error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Liabilities Controller
 * #### Update A Liability
 * Use the request data to update the liability
 */
exports.update_liability = async (req, res) => {
	try{
		const { status, ...more } = await update_liability_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch(error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Liabilities Controller
 * #### Get A Liability 
 * Use the data contained in the req.body to get a liability
 */
exports.get_liability = async (req, res) => {
	try{
		const { status, ...more } = await get_liability_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch(error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Liabilities Controller
 * #### Delete A Liability 
 * Use the data contained in the req.body to Delete a liability
 */

exports.delete_liability = async (req, res) => {
	try{
		const { status, ...more } = await delete_liability_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch(error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}

/**
 * ### Liabilities Controller
 * #### Get All Liability Associated with a User 
 * Use the data contained in the req.params.id to get all liability's
 */

exports.get_all_liability = async (req, res) => {
	try{
		const { status, ...more } = await get_all_liability_factory(req.body);
		res.status(status).json({ status, ...more });
	}catch(error) {
		console.error("Error in controller", error);
		res.status(STATUS.SERVER_ERR_500).json({ message: error.message, error: "An Unknow Error", status: STATUS.SERVER_ERR_500});
	}
}