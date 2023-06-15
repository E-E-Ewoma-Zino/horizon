const mongoose = require("mongoose");

/**
 * ### Beneficiary DAO
 * This class contains methods used for performing CRUD operations
 * @constructor Beneficiary Schema
 */
class LiabilityDAO {
	constructor() {
		this.liability = require("../schema/Liability");
	}

	async create(data) {
		return await this.liability.create(data);
	}
	
	async findById(id) {
		return await this.liability.findById(id);
	}
	
	async update(id, data) {
		return await this.liability.findOneAndUpdate(new mongoose.Types.ObjectId(id), data);
	}
	
	async remove(id) {
		return await this.liability.findByIdAndDelete(id);
	}
	
	async findAllByUser(user) {
		return await this.liability.find({user_id: user});
	}
}

module.exports = new LiabilityDAO();