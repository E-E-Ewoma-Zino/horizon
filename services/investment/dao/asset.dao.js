const mongoose = require("mongoose");


class AssetDAO {
	constructor() {
		this.asset = require('../schema/Asset');
		this.options = { new: true };
	}

	async create(data) {
		return await this.asset.create(data);
	}

	async findOne(data) {
		return await this.asset.findOne(data);
	}

	async getAllByUser(data) {
		return await this.asset.find(data);
	}

	async delete(data) {
		return await this.asset.findByIdAndDelete(data._id, this.options);
	}

	async update(id, data) {
		return await this.asset.findOneAndUpdate(new mongoose.Types.ObjectId(id), data, this.options);
	}
}

module.exports = new AssetDAO();