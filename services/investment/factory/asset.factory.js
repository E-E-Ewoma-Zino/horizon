const ERROR = require("../../../constants/error.constant");
const STATUS = require("../../../constants/status.constants");
const assetDao = require('../dao/asset.dao');


exports.create_asset_factory = async (data) => {
     try{
      const result = await assetDao.create(data);

      if (!result) throw {
			status: STATUS.SERVER_ERR_500,
			error: "SERVER_ERROR",
			message: "Failed to create Asset",
			result
		}

		return {
			status: STATUS.CREATED_201,
			message: "Successfully created Asset",
			error: null,
			result
		}
	} catch (error) {
		return ERROR(error);
	}   
         
}



exports.update_asset_factory = async (data) => {
    const { _id, ...others } = data;
    try {
  const result = await assetDao.update(_id, others);

  if (!result)
    throw {
      status: STATUS.NOT_FOUND_404,
      error: "NOT_FOUND",
      message: "Failed to update Asset with id: " + _id,
      result,
    };
    return {
    error: null,
    status: STATUS.OK_200,
    message: "Successfully updated Asset",
    result: result,
  };
    } catch (error) {
        return ERROR(error);
    }

}



exports.delete_asset_factory = async (id) => {
    try {
      const result = await assetDao.delete(id);
      if (!result)
        throw {
          status: STATUS.NOT_FOUND_404,
          error: "NOT FOUND",
          message: "Asset does not exist: " + _id,
          result,
        };
      return {
        status: STATUS.OK_200,
        message: "Asset Successfully Deleted",
        result,
      };
    } catch (error) {
      return ERROR(error);
    }

}


exports.getAll_asset_factory = async (user) => {
    try {
		const result = await assetDao.findAllByUser(user);
		if (!result) throw {
			status: STATUS.NOT_FOUND_404,
			error: "NOT FOUND",
			message: "No Assets associated with this user: " + user,
			result
		}
		return {
			status: STATUS.OK_200,
			message: "All Assets: ",
			result
		}
	} catch (err) {
		return ERROR(err);
	}
} 



exports.get_asset_factory = async (id) => {
    try {
      const result = await assetDao.findById(id);

      if (!result)
        throw {
          status: STATUS.NOT_FOUND_404,
          error: "SERVER_ERROR",
          message: "Failed to find Asset with id: " + data._id,
          result,
        };

      return {
        status: STATUS.OK_200,
        message: "Successfully found Asset",
        error: null,
        result,
      };
    } catch (error) {
      return ERROR(error);
    }
}