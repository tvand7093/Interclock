var DirbleRepository = require('../repos/dirbleRepository');
var proc = require('child_process');
var Results = require('../repos/apiCodes');
var AudioManager = require('../repos/audioManager').AudioManager;

var audio = new AudioManager();
var codes = Results.statusCodes;
var ApiResult = Results.ApiResult;
var api = new DirbleRepository();

exports.play = function(req, res){
    if(req.params.id != null){
	api.getStation(req.params.id, function(station){
	    if(station != null && station.result.length > 0){
		console.log(station.result);
		var result = audio.play(station.result[0].streamurl);
		result.result = station;

		res.send(result);
	    }
	});
    }
}

exports.search = function(req, res){
    if(req.params.search != null){
	//do search
	api.searchForStation(req.params.search, function(station) {
	    var reply = station != null ? 
		new ApiResult(codes.success, null, station) :
		new ApiResult(codes.stationNotFound,
			      "Could not find a station matching: " + req.params.search,
			     station);
	    res.send(reply);
	}, function(error){
	    res.send(new ApiResult(codes.unknown, error, error));
	});	
    }
};

exports.stop = function(req, res){
    //stop all radio from playing
    var result = audio.stop();
   res.send(result);
};


