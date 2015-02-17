var StationRouter = require('./station').StationRouter
var self = {}
var ApiResult = require("./apiCodes").ApiResult
var codes = require('./apiCodes').statusCodes
var Scheduler = require('./Scheduler').Scheduler

function SocketManager(http, router){
   this.io = require('socket.io')(http)
    this.stations = new StationRouter(this.io)
    
    this.io.on('connection', function(socket){	
	console.log("Connected client.")

	socket.on('status', function(deviceId){
	    socket.emit('status', {
		"deviceId": deviceId,
		"status": self.stations.isRunning()})
	})

	socket.on('search', function(searchParams){
	    self.stations.search(searchParams.deviceId,
				 searchParams.name)
	})

	socket.on('play', function(playParams){
	    self.stations.play(playParams.deviceId,
			       playParams.stationId)
	})

	socket.on('stop', function(deviceId){
	    self.stations.stop(deviceId)
	})
    })
    this.router = router
    this.alarms = new Scheduler()
    self = this
    self.router.post('/play', playREST)
    self.router.post('/stop', stopREST)
    self.router.get('/status', statusREST)
    self.router.post('/search', searchREST)
    self.router.post("/schedule", scheduleREST) 
    self.router.delete("/schedule/:alarmId", scheduleStopREST)
}

function scheduleStopREST(req, res){
    self.alarms.cancelAlarm(req.body.alarmId)
    res.end(JSON.stringify(
	new ApiResult('', codes.success, "Canceled alarm")
    ))
}

function scheduleREST(req, res){
    var hour = req.body.hour
    var min = req.body.minute
    var beginDay = req.body.beginDay
    var endDay = req.body.endDay
    var deviceId = req.body.deviceId
    var stationId = req.body.stationId

    var alarmTrigger = function(){
	console.log("alarm triggered!")
	self.stations.play(deviceId, stationId)
    }
    
    var alarmId = self.alarms.createAlarm(hour, min, beginDay, endDay,
					  alarmTrigger)
					  

    res.end(JSON.stringify(
	new ApiResult('', codes.success, "Created new alarm.", alarmId)
    ))
}
    
function playREST(req, res){
    self.stations.play(req.body.deviceId,
		       req.body.stationId,
		       function(station){
			   res.end(
			       JSON.stringify(
			       new ApiResult(req.body.deviceId,
						 codes.success,
					     "Started playing audio.")))
		       })
}

function stopREST (req, res){
    self.stations.stop(req.body.deviceId)
    var result = new ApiResult(req.body.deviceId,
			       codes.success, "Stopped succesfully")
    
    res.end(JSON.stringify(result))
}

function statusREST(req, res){
    res.end(JSON.stringify(
	new ApiResult('',
		      codes.success,
		      self.stations.isRunning())))
}

function searchREST(req, res){
    self.stations.search(req.body.deviceId,
			 req.body.search, function(data){
			     res.end(JSON.stringify(data))
			 })
}

module.exports.SocketManager = SocketManager;
   
