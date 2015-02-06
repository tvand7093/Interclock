var config = require('../config/config');
var request = require('request');
var extensions = require('../misc/extensions');

function DirbleRepository() {
    this.isRunningAudio = false;;
};

DirbleRepository.prototype.makeApiCall = function(url, success, failure){
    request(url, function(error, response, json){
	var results = [];
	if(!error && response.statusCode == 200){
	    json = JSON.parse(json);
	    if(json.length == 1){
		success(json[0]);
	    }
	    else{
		success(json);
	    }
	}
	else{
	    failure(error);
	}
    });
};

DirbleRepository.prototype.searchForStation = function(station, success, failure){
    var url = config.api.searchStations.format(station);
    this.makeApiCall(url, success, failure);
}

DirbleRepository.prototype.getStation = function(stationId, success, failure){
    var url = config.api.station.format(stationId);
    this.makeApiCall(url, success, failure);
}

module.exports = DirbleRepository;

