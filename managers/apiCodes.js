var statusCodes = {
    success: 0,
    stationNotFound: 1,
    unknown: 2,
    playFailed: 3
};

function ApiResult(deviceId, code, msg, result){
    this.code = code;
    this.message = msg;
    this.result = result;
    this.deviceId = deviceId
};

exports.statusCodes = statusCodes;
exports.ApiResult = ApiResult;
