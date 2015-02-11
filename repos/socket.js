var StationRouter = require('./station').StationRouter
var self = {}

module.exports.SocketManager = function (http){
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

	socket.on('stop', function(deviceId){
	    self.stations.stop(deviceId)
	})
    })
    self = this
 }
   
