// Set the listeners for benefactors


module.exports = (e) => {
	e.on("new_benefactor", (data) => {
		console.log("Emitted new_benefactor", data);
	});
}