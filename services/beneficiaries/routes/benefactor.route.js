const { create_benefactor } = require("../controllers");

module.exports = (app) => {
	app.get("/", create_benefactor);
}