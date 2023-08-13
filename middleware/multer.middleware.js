const multer = require("multer");
const MAO = require("multer-aliyun-oss");
const settings = require("../config/index");

const uplaodFile = multer({
	storage: MAO({
		config: {
			region: settings.alibabaRegion,
			accessKeyId: settings.alibabaKeyID,
			accessKeySecret: settings.alibabaKeySecret,
			bucket: settings.alibabaBucketName
		},
	})
});

module.exports = uplaodFile;