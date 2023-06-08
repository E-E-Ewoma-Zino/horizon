// Set the listeners for benefactors
const singleMail = require("../alibaba");

module.exports = (e) => {
	e.on("new_benefactor", (data) => {
		singleMail(data.email, "You Are Now A Benefactor", "You have been made a benefactor to {user.name}")
		console.log("Emitted new_benefactor", data);
	});
}