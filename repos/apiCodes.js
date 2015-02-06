var statusCodes = {
    success: 0,
    stationNotFound: 1,
    unknown: 2,
    playFailed: 3
};

function ApiResult(code, msg, result){
    this.code = code;
    this.message = msg;
    this.result = result;
};

exports.statusCodes = statusCodes;
exports.ApiResult = ApiResult;
