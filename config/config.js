var config = {}

config.keys = {
    apiKey: 'a9f79683444236ece519cf34ee9150f6dcbc34a6'
};

config.api = {};

config.api.baseUrl = 'http://api.dirble.com/v1';
config.api.allCategories = config.api.baseUrl + '/categories/apikey/';
config.api.primaryCategories = config.api.baseUrl + '/primaryCategories/apikey/' + config.keys.apiKey;
config.api.childCategories = config.api.baseUrl + '/childCategories/apikey/' + config.keys.apiKey + '/primaryid/%s';
config.api.stationsForCategory = config.api.baseUrl + '/stations/apikey/' + config.keys.apiKey + '/id/%s';
config.api.searchStations = config.api.baseUrl + '/search/apikey/' + config.keys.apiKey + '/search/%s';
config.api.stationsForContitnent = config.api.baseUrl + '/continent/apikey/' + config.keys.apiKey + '/continent/%s';
config.api.stationsForCountry = config.api.baseUrl + '/country/apikey/' + config.keys.apiKey + '/country/%s';
config.api.station = config.api.baseUrl + '/station/apikey/' + config.keys.apiKey + '/id/%s';
config.api.checkStation = config.api.baseUrl + '/amountStation/apikey/' + config.keys.apiKey;

module.exports = config;