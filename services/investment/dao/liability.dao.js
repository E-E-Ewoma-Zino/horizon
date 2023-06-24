const mongoose = require("mongoose");

/**
 * ### Beneficiary DAO
 * This class contains methods used for performing CRUD operations
 * @constructor Beneficiary Schema
 */
class LiabilityDAO {
	constructor() {
		this.liability = require("../schema/Liability");
		this.options = { new: true };
	}

	async create(data) {
		return await this.liability.create(data);
	}
	
	async findById(id) {
		return await this.liability.findById(id);
	}
	
	async update(id, data) {
		return await this.liability.findOneAndUpdate(new mongoose.Types.ObjectId(id), data, this.options);
	}
	
	async remove(id) {
		return await this.liability.findByIdAndDelete(id);
	}
	
	async findAllByUser(data) {
		return await this.liability.find(data);
	}
}

module.exports = new LiabilityDAO();