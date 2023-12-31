const ALERTS = require("./alerts.constants")
const STATUS = require("./status.constants")

/**
 * Return an object that handels the general catch error block
 */
const ERROR = (error) => {
	return {
		status: error.status || STATUS.SERVER_ERR_500,
		alert: error.alert || ALERTS.DANGER,
		...error,
		message: error.error ? error.message : "An unknown error occured",
		error: error.error || error.message,
		result: error.result || null
	}
}

module.exports = ERROR;