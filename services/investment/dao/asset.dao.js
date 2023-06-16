const mongoose = require("mongoose");


class AssetDAO{
    constructor(){
        this.asset = require('../schema/Asset');
    }

    async create (data){
        return await this.asset.create(data);
    }

    async findById(id){
        return await this.asset.findById(id);
    }

    async getAllByUser(user){
        return await this.asset.find({user: user});
    }

    async delete(id){
        return await this.asset.findByIdAndDelete(id);
    }

    async update(id, data){
        return await this.asset.findOneAndUpdate(new mongoose.Types.ObjectId(id), data)
    }
}

module.exports = new AssetDAO();