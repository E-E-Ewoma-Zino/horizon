const mongoose = require("mongoose");

/**
 * ### Beneficiary DAO
 * This class contains methods used for performing CRUD operations
 * @constructor Beneficiary Schema
 */
class BeneficiaryDAO {
	constructor() {
		this.beneficiary = require("../schema/Beneficiary");
		this.user = require("../schema/User");
		this.options = { new: true };
	}

	async createUser(data) {
		return await this.user.create(data);
	}

	async create(data) {
		return await this.beneficiary.create(data);
	}

	async findById(id) {
		return await this.beneficiary.findById(id);
	}

	async update(id, data) {
		return await this.beneficiary.findOneAndUpdate(new mongoose.Types.ObjectId(id), data, this.options);
	}

	async remove(id) {
		return await this.beneficiary.findByIdAndDelete(id, this.options);
	}

	async findAllByUser(data) {
		return await this.beneficiary.find(data);
	}
}

module.exports = new BeneficiaryDAO();