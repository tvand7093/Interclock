var StationManager = require('./stationManager').StationManager
var self = {}
var ApiResult = require("./apiCodes").ApiResult
var codes = require('./apiCodes').statusCodes
var Scheduler = require('./Scheduler').Scheduler
var uuid = require('node-uuid')

function Manager(){
    this.stations = new StationManager()
    this.alarms = new Scheduler()
    self = this
}

Manager.prototype.scheduleStopREST = function(req, reply){
    self.alarms.cancelAlarm(req.params.alarmId)
    self.stations.stop()
    reply(
	new ApiResult('', codes.success, "Canceled alarm")
    )
}

Manager.prototype.scheduleREST = function (req, reply){
    var hour = req.payload.hour
    var min = req.payload.minute
    var beginDay = req.payload.beginDay
    var endDay = req.payload.endDay
    var deviceId = req.payload.deviceId
    var stationId = req.payload.stationId
    var alarmId = uuid.v4()

    var alarmTrigger = function(){
	self.stations.play(deviceId, alarmId, stationId)
    }
    
    self.alarms.createAlarm(alarmId, hour, min, beginDay, endDay,
					  alarmTrigger)
					  
    reply(
	new ApiResult('', codes.success, "Created new alarm.", alarmId)
    )
}
    
Manager.prototype.playREST = function(req, reply){
    self.stations.play(req.payload.deviceId,
		       req.payload.stationId,
		       function(station){
			   console.log(station)
			   reply(
			       new ApiResult(req.payload.deviceId,
						 codes.success,
					     "Started playing audio."))
		       })
}

Manager.prototype.stopREST = function (req, reply){
    self.stations.stop()
    var result = new ApiResult(req.payload.deviceId,
			       codes.success, "Stopped succesfully")
    
    reply(result)
}

Manager.prototype.statusREST = function(req, reply){
    reply(self.stations.running())
}

Manager.prototype.searchREST = function (req, reply){
    self.stations.search(req.payload.deviceId,
			 req.payload.search, function(data){
			     reply(data)
			 })
}

module.exports.Manager = Manager;
   
