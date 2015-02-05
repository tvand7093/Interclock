
var config = require('../config/config.js');
var request = require('request');
var Station = require('./station.js');

function DirbleRepository() {
    this.currentResults = [];
    this.runningAudio = [];
};

DirbleRepository.prototype.makeApiCall = function(url, success, failure){
    request(url, function(error, response, json){
	var results = [];
	if(!error && response.statusCode == 200){
	    json = JSON.parse(json);
	    if(json.length == 1){
		success(json[0]);
		return;
	    }
	    else{
		success(json);
		return;
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

module.exports = DirbleRepository;

