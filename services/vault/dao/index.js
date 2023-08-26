const mongoose = require("mongoose");

/**
 * ### Vault DAO
 * This class contains methods used for performing CRUD operations
 * @constructor Vault Schema
 */
class VaultDAO {
	constructor() {
		this.vault = require("../schema");
		this.options = { new: true };
	}

	async create(data) {
		return await this.vault.create(data);
	}

	async findOne(data) {
		return await this.vault.findOne(data);
	}

	async update(id, data) {
		return await this.vault.findOneAndUpdate(new mongoose.Types.ObjectId(id), data, this.options);
	}

	/**
	 * 
	 * @param {Array} ids This is an array of ids to be updated
	 * @param {Object} data This contains the update to be made
	 * @example updateMany(["8392999939e9e9e9aa"], {$set:{completed: true}});
	 */
	async updateMany(ids, data) {
		return await this.vault.updateMany({_id: {$in: ids }}, data, this.options);
	}

	async remove(data) {
		return await this.vault.findByIdAndDelete(data._id, this.options);
	}

	async findAllByUser(data) {
		return await this.vault.find(data);
	}
}

module.exports = new VaultDAO(); 