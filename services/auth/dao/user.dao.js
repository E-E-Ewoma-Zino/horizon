const mongoose = require("mongoose");

/**
 * ### User DAO
 * This class contains methods used for performing CRUD operations
 * @constructor User Schema
 */
class UserDao {
	constructor() {
		this.user = require("../schema/User");
		this.options = { new: true };
	}

	async create(data) {
		return await this.user.create(data);
	}

	async findById(id) {
		return await this.user.findById(id);
	}

	async findOne(data) {
		return await this.user.findOne(data);
	}

	async update(id, data) {
		return await this.user.findOneAndUpdate(new mongoose.Types.ObjectId(id), data, this.options);
	}

	/**
	 * 
	 * @param {Array} ids This is an array of ids to be updated
	 * @param {Object} data This contains the update to be made
	 * @example updateMany(["8392999939e9e9e9aa"], {$set:{completed: true}});
	 */
	async updateMany(ids, data) {
		return await this.user.updateMany({_id: {$in: ids }}, data, this.options);
	}

	async remove(data) {
		return await this.user.findByIdAndDelete(data._id, this.options);
	}
}

module.exports = new UserDao();