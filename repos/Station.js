var config = require('../config/config.js');

function Station(jsonData) {
    if(jsonData != null){
	this.id = jsonData.id;
	this.name = jsonData.name;
	this.streamurl = jsonData.streamurl;
	this.country = jsonData.country;
	this.bitrate = jsonData.bitrate;
	this.status = jsonData.status;
    }
    else{
	this.id = 0;
	this.name = "";
	this.streamurl = "";
	this.country = "";
	this.bitrate = "";
	this.status = 0;
    }
};

module.exports = Station;
