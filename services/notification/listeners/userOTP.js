// Set the listeners for benefactors
const singleMail = require("../alibaba");

module.exports = (e) => {
	e.on("verify_user", (data) => {
		singleMail(data.email, "Do no share this OTP", "Use this One Time Token to access your account: " + data.otp)
		console.log("Emitted verify_user", data);
	});
}