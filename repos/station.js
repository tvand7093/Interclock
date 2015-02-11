var DirbleRepository = require('../repos/dirbleRepository').DirbleRepository
var proc = require('child_process');
var Results = require('../repos/apiCodes')
var ApiResult = Results.ApiResult
var codes = Results.statusCodes
var AudioManager = require('../repos/audioManager').AudioManager
var self = {}

function StationRouter(io){
    this.io = io
    this.audio = new AudioManager(this.io)
    this.api = new DirbleRepository()    
    self = this
}

StationRouter.prototype.isRunning = function(){
    return self.audio.isRunning()
}

StationRouter.prototype.play = function(deviceId, stationId){
    if(stationId != null){
	self.api.getStation(stationId, function(station){
	    if(station != null){
		self.audio.play(deviceId, station.streamurl)
	    }
	}, function(error){
	    self.io.emit('audioResult', new ApiResult(deviceId, codes.error, 'Play error: ' + error))
	})
    }
}

StationRouter.prototype.search = function(deviceId, search){
    if(search != null){
	//do search
	self.api.searchForStation(search, function(station) {
	    var reply = station != null ? 
		new ApiResult(deviceId, codes.success, null, station) :
		new ApiResult(deviceId, codes.stationNotFound,
			      "Could not find a station matching: " + req.params.search,
			     station)
	    self.io.emit('audioResult', reply)
	}, function(error){
	    self.io.emit('audioResult',
			 new ApiResult(deviceId, codes.unknown, error, error))
			
	})	
    }
}

StationRouter.prototype.stop = function(deviceId){
    //stop all radio from playing
    self.audio.stop()
    res.send("stopped.")
}

exports.StationRouter = StationRouter
