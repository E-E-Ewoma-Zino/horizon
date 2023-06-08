// This script contains all env keys and values
require("dotenv").config();

/**
 * A const variable containing all env values
 */
const settings = {
	port: process.env.PORT,
	mongo_url: process.env.MONGO_URL,
	alibabaKeyID: process.env.ALIBABA_KEY_ID,
	alibabaBucketName: process.env.ALIBABA_BUCKET_NAME,
	alibabaRegion: process.env.ALIBABA_BUCKET_REGION,
	alibabaUrlEndpoint: process.env.ALIBABA_URL_ENDPOINT,
	alibabaKeySecret: process.env.ALIBABA_KEY_SECRET,
	alibabaApiVersion: process.env.ALIBABA_API_VERSION
}

module.exports = settings;