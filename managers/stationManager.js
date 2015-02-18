var DirbleRepository = require('../managers/dirbleRepository').DirbleRepository
var proc = require('child_process');
var Results = require('../managers/apiCodes')
var ApiResult = Results.ApiResult
var codes = Results.statusCodes
var AudioManager = require('../managers/audioManager').AudioManager
var self = {}

function StationManager(){
    this.audio = new AudioManager()
    this.api = new DirbleRepository()    
    self = this
}

StationManager.prototype.running = function(){
    return self.audio.running()
}

StationManager.prototype.play = function(deviceId, alarmId, stationId, callback){
    if(stationId != null){
	self.api.getStation(stationId, function(station){
	    if(station != null){
		self.audio.play(deviceId,
				alarmId,
				station.name,
				station.streamurl)
		if(callback != null){
		    callback(station)
		}	
	    }
	}, function(error){
	    if(callback != null){
		callback(station)
	    }
	})
    }
}

StationManager.prototype.search = function(deviceId, search, callback){
    if(search != null){
	//do search
	return self.api.searchForStation(search, function(station) {
	    var reply = station != null ? 
		new ApiResult(deviceId, codes.success, null, station) :
		new ApiResult(deviceId, codes.stationNotFound,
			      "Could not find a station matching: " + req.params.search,
			     station)
	    if(callback != null){
		callback(reply)
	    }
	}, function(error){
	    if(callback != null){
		callback()
	    }
	    res.write(new ApiResult(deviceId, codes.unknown, error, error))
	})	
    }
}

StationManager.prototype.stop = function(deviceId){
    //stop all radio from playing
    self.audio.stop()
}

exports.StationManager = StationManager
