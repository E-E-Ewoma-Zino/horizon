// This script contains all env keys and values
require("dotenv").config();

/**
 * A const variable containing all env values
 */
const settings = {
    port: process.env.PORT,
	mongo_url: process.env.MONGO_URL
}

module.exports = settings;