const generalEmmiter = require("../../notification/listeners");





exports.create_benefactor = (req, res) => {
	const new_benefactor = 
	generalEmmiter.emit("new_benefactor", {ok: "Yes"});

	res.status(200).json({status: 200});
}