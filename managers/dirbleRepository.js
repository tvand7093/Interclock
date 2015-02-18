var config = require('../config/settings');
var request = require('request');
var extensions = require('../misc/extensions');

var api = {};

api.baseUrl = 'http://api.dirble.com/v1';
api.allCategories = api.baseUrl + '/categories/apikey/';
api.primaryCategories = api.baseUrl + '/primaryCategories/apikey/' + config.apiKey;
api.childCategories = api.baseUrl + '/childCategories/apikey/' + config.apiKey + '/primaryid/%s';
api.stationsForCategory = api.baseUrl + '/stations/apikey/' + config.apiKey + '/id/%s';
api.searchStations = api.baseUrl + '/search/apikey/' + config.apiKey + '/search/%s';
api.stationsForContitnent = api.baseUrl + '/continent/apikey/' + config.apiKey + '/continent/%s';
api.stationsForCountry = api.baseUrl + '/country/apikey/' + config.apiKey + '/country/%s';
api.station = api.baseUrl + '/station/apikey/' + config.apiKey + '/id/%s';
api.checkStation = api.baseUrl + '/amountStation/apikey/' + config.apiKey;

function DirbleRepository(){}

DirbleRepository.prototype.makeApiCall = function(url, success, failure){
    request(url, function(error, response, json){
	var results = [];
	if(!error && response.statusCode == 200){
	    json = JSON.parse(json);
	    success(json);
	}
	else{
	    failure(error);
	}
    });
};

DirbleRepository.prototype.searchForStation = function(station, success, failure){
    var url = api.searchStations.format(station);
    this.makeApiCall(url, success, failure);
}

DirbleRepository.prototype.getStation = function(stationId, success, failure){
    var url = api.station.format(stationId);
    this.makeApiCall(url, success, failure);
}

exports.DirbleRepository = DirbleRepository;

