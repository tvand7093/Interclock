var config = require('../config/config.js');
var request = require('request');
function DirbleRepository() {
    this.name = "dirble";
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

