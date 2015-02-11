var ext = require('../misc/extensions')
var proc = require('child_process')
var Results = require('./apiCodes')
var codes = Results.statusCodes
var ApiResult = Results.ApiResult

function AudioManager(io){
    this.mPlayer = 'mplayer'
    this.currentAudio = null
    this.stopCommand = "quit\n"
    this.io = io

    //require volume to be up.
    var vol = "../scripts/vol.sh 95 2> ../scripts/logs/audioError.log"
    proc.exec(vol)
}

AudioManager.prototype.isRunning = function(){
    return this.currentAudio != null ? "Playing audio." : "Inactive"
}

AudioManager.prototype.beginAudio = function(deviceId, url){
    if(this.currentAudio == null){
	this.currentAudio = proc.spawn(this.mPlayer, ["-slave", url],
				       {stdio: ['pipe', 'pipe', 'pipe']})
	this.currentAudio.stdout.pipe(process.stdout);
    }

    this.io.emit('audioResult', new ApiResult(deviceId, codes.success,
					 "Succesfully started playing audio."))
}

AudioManager.prototype.stop = function(deviceId){
    if(this.currentAudio != null){
	this.currentAudio.stdin.write(this.stopCommand)
	this.isRunningAudio = false
	this.currentAudio = null
	this.io.emit('audioResult', new ApiResult(deviceId, codes.success,
					     "Succesfully stopped playing audio."))
    }
}

AudioManager.prototype.play = function(deviceId, url){
    this.stop(deviceId)
    this.beginAudio(deviceId, url)
}  

exports.AudioManager = AudioManager
