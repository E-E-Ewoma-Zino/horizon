/**
 * ### OTP DAO
 * This class contains methods used for performing CRUD operations
 * @constructor OTP Schema
 */
class OTPDao {
	constructor() {
		this.otp = require("../schema/OTP");
		this.options = { new: true };
	}

	async create(email) {
		return await this.otp.create({email, otp: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000});
	}

	async findOne(data) {
		return await this.otp.findOne(data);
	}

	async remove(data) {
		return await this.otp.findByIdAndDelete(data._id, this.options);
	}
}

module.exports = new OTPDao();