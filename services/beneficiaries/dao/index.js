const mongoose = require("mongoose");

/**
 * ### Beneficiary DAO
 * This class contains methods used for performing CRUD operations
 * @constructor Beneficiary Schema
 */
class BeneficiaryDAO {
	constructor() {
		this.beneficiary = require("../schema/Beneficiary");
	}

	async create(data) {
		return await this.beneficiary.create(data);
	}
	
	async findById(id) {
		return await this.beneficiary.findById(id);
	}
	
	async update(id, data) {
		return await this.beneficiary.findOneAndUpdate(new mongoose.Types.ObjectId(id), data);
	}
	
	async remove(id) {
		return await this.beneficiary.findByIdAndDelete(id);
	}
	
	async findAllByUser(user) {
		return await this.beneficiary.find({user_id: user});
	}
}

module.exports = new BeneficiaryDAO();