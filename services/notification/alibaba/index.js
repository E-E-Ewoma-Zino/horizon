/** Import Dependencies **/
const Core = require('@alicloud/pop-core');
/** Import custom configs **/
const settings = require('../../../config');


/**Initialize Alibaba Core **/
const client = new Core({
	accessKeyId: settings.alibabaKeyID,
	accessKeySecret: settings.alibabaKeySecret,
	endpoint: settings.alibabaUrlEndpoint,
	apiVersion: settings.alibabaApiVersion
});

const getParams = (sendTo, subject, body) => {
	return {
		"RegionId": "ap-southeast-1",
		"AccountName": "mail@getbilling.co",
		"AddressType": 1,
		"ReplyToAddress": true,
		"ToAddress": sendTo,
		"Subject": subject,
		"HtmlBody": body
	}
}

var requestOption = {
	method: 'POST'
};

function singleMail(sendTo, subject, body) {
	client.request('SingleSendMail', getParams(sendTo, subject, body), requestOption).then((result) => {
		console.log(JSON.stringify(result));
	}, (ex) => {
		console.log(ex);
	})
}

module.exports = singleMail;