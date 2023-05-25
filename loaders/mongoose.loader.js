const mongoose = require("mongoose");
const settings = require("../config");

/**
 * ## MongoDB Initializer
 * Calling this method will setup the Mongo connection
 */
const MongoLoader = async () => {
	try {
		mongoose.set("strictQuery", false); // What does this do? @Daniel
		const connect = await mongoose.connect(settings.mongo_url, {
			useNewUrlParser: true,
		});

		console.log("MongoDB connected: ", connect.connection.host);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = MongoLoader;