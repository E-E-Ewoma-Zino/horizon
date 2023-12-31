const mongoose = require("mongoose");

/**
 * ### Beneficiary DAO
 * This class contains methods used for performing CRUD operations
 * @constructor Beneficiary Schema
 */
class BeneficiaryDAO {
	constructor() {
		this.beneficiary = require("../schema/Beneficiary");
		this.options = { new: true };
	}

	async create(data) {
		return await this.beneficiary.create(data);
	}

	async findOne(data) {
		return await this.beneficiary.findOne(data);
	}

	async update(id, data) {
		return await this.beneficiary.findOneAndUpdate(new mongoose.Types.ObjectId(id), data, this.options);
	}

	/**
	 * 
	 * @param {Array} ids This is an array of ids to be updated
	 * @param {Object} data This contains the update to be made
	 * @example updateMany(["8392999939e9e9e9aa"], {$set:{completed: true}});
	 */
	async updateMany(ids, data) {
		return await this.beneficiary.updateMany({_id: {$in: ids }}, data, this.options);
	}

	async remove(data) {
		return await this.beneficiary.findByIdAndDelete(data, this.options);
	}

	async findAllByUser(data) {
		return await this.beneficiary.find(data);
	}
}

module.exports = new BeneficiaryDAO();