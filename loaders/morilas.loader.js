// Import Moralis
const Moralis = require("moralis").default;
const settings = require("../config");
// Import the EvmChain dataType
// const { EvmChain } = require("@moralisweb3/common-evm-utils");

const config = {
	domain: settings.moralisAppDomain,
	statement: "Sign in with Metamask",
	uri: settings.moralisAuthUrl,
	timeout: 60
}

async function handeler(req, res) {
	const { address, chain, network } = req.body;
	await Moralis.start({ apiKey: settings.moralisAPIKey });

	try {
		const message = await Moralis.Auth.requestMessage({
			address,
			chain,
			network,
			...config
		});

		res.status(200).json({ status: 200, alert: "success", error: null, message: "Request Message was successful", result: message });
	} catch (error) {
		res.status(400).json({ status: 400, alert: "danger", error, message: "Failed to send meaage request", result: null });
	}
}

async function verifyAuth(req, res) {
	try {
		const { message, signature } = req.body;

		await Moralis.start({ apiKey: settings.moralisAPIKey });

		const { address, profileId } = (await Moralis.Auth.verify({ message, signature, networkType: "evm" })).raw;

		const user = { address, profileId, signature };

		// TODO: Sign a JWT token here	

		res.status(200).json({ status: 200, alert: "success", error: null, message: "User verified successful", result: user});
	} catch (error) {
		res.status(400).json({ status: 400, alert: "danger", error, message: "Verification Failed", result: null });
	}
}