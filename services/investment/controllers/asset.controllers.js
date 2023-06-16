const STATUS = require("../../../constants/status.constants");
const {create_asset_factory, update_asset_factory, delete_asset_factory, getAll_asset_factory, get_asset_factory} = require('../factory/asset.factory');


exports.create_asset = async (req, res) => {
    try {
      const { status, ...more } = await create_asset_factory(req.body);
      res.status(status).json({ status, ...more });
    } catch (error) {
      console.error("Error in controller", error);
      res
        .status(STATUS.SERVER_ERR_500)
        .json({
          message: error.message,
          error: "An Unknow Error",
          status: STATUS.SERVER_ERR_500,
        });
    }
}



exports.update_asset = async (req, res) => {
    try {
      const { status, ...more } = await update_asset_factory(req.body);
      res.status(status).json({ status, ...more });
    } catch (error) {
      console.error("Error in controller", error);
      res
        .status(STATUS.SERVER_ERR_500)
        .json({
          message: error.message,
          error: "An Unknow Error",
          status: STATUS.SERVER_ERR_500,
        });
    }
}


exports.delete_asset = async (req, res) =>{
    try {
      const { status, ...more } = await delete_asset_factory(req.body);
      res.status(status).json({ status, ...more });
    } catch (error) {
      console.error("Error in controller", error);
      res
        .status(STATUS.SERVER_ERR_500)
        .json({
          message: error.message,
          error: "An Unknow Error",
          status: STATUS.SERVER_ERR_500,
        });
    }
}



exports.getall_asset = async (req, res) => {
    try {
      const { status, ...more } = await getAll_asset_factory(req.body);
      res.status(status).json({ status, ...more });
    } catch (error) {
      console.error("Error in controller", error);
      res
        .status(STATUS.SERVER_ERR_500)
        .json({
          message: error.message,
          error: "An Unknow Error",
          status: STATUS.SERVER_ERR_500,
        });
    }
}



exports.get_one_asset = async (req, res) => {
    try {
      const { status, ...more } = await get_asset_factory(req.body);
      res.status(status).json({ status, ...more });
    } catch (error) {
      console.error("Error in controller", error);
      res
        .status(STATUS.SERVER_ERR_500)
        .json({
          message: error.message,
          error: "An Unknow Error",
          status: STATUS.SERVER_ERR_500,
        });
    }
}