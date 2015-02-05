var config = require('../config/config.js');

function Station() {
    this.name = "";
    this.name = "";
    this.name = "";
    this.name = "";
    this.name = "";
};

DirbleRepository.prototype.searchForStation = function (stationName) {
    var url = config.api.searchStations.format(stationName);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else {
            console.log(error);
        }
    });
};

module.exports = DirbleRepository;

