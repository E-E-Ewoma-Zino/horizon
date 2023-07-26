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
	alibabaApiVersion: process.env.ALIBABA_API_VERSION,
	tokenSecret: process.env.TOKEN_SECRET,
	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
	moralisAppDomain: process.env.APP_DOMAIN,
	moralisAPIKey: process.env.MORALIS_API_KEY,
	moralisAuthUrl: process.env.AUTH_URL,
	moralisAuthSecreat: process.env.AUTH_SECREAT
}

module.exports = settings;