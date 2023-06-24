const Converter = require("currency-converter-lt");
const MONETARY_UNIT = require("../../constants/monetaryUnit");

/**
 * ## Currency Convertor
 * This script receives a currency and a value and converts it to usd
 * @param {Number} value The amount for the currency
 * @param {String} currency The short hand symbol for the currency
 * @example await currencyConverter(2000, "NGN");
 * @returns Value in USD
 */
module.exports = function currencyConverter(value, currency) {
	try {
		// Check if the request contains the necessary data for currency conversion
		if (!currency && !value) return null;

		if(currency === "BTC") currency = "XBT";

		let convertedCurrency = new Converter({ from: currency, to: "USD", amount: Number(value), isDecimalComma: true });

		return new Promise((resolve, reject) => {
			convertedCurrency.convert().then((response) => {
				return resolve(response * MONETARY_UNIT["USD"]);
			}).catch((error) => {
				console.error("Failed to convert currency", error);
				return reject(null);
			});
		});
	} catch (error) {
		// Handle any errors from the currency conversion library
		console.error("Error in currency converter", error);
		return null;
	}
};