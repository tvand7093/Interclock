var ext = require('../misc/extensions')
var proc = require('child_process')
var Results = require('./apiCodes')
var codes = Results.statusCodes
var ApiResult = Results.ApiResult

function AudioManager(){
    this.mPlayer = 'mplayer'
    this.currentAudio = null
    this.meta = null
    this.stopCommand = "quit\n"

    //require volume to be up.
    var vol = "../scripts/vol.sh 95 2> ../scripts/logs/audioError.log"
    proc.exec(vol)
}

AudioManager.prototype.running = function(){
   
    var msg = this.currentAudio != null ? "Playing audio." : "Inactive"
    
    return new ApiResult('',
			 codes.success,
			 msg,
			 this.meta)
}

AudioManager.prototype.beginAudio = function(deviceId, alarmId, name, url){
    if(this.currentAudio == null){
	this.currentAudio = proc.spawn(this.mPlayer, ["-slave", url],
				       {stdio: ['pipe', 'pipe', 'pipe']})
	this.currentAudio.stdout.pipe(process.stdout);
	this.meta.alarmId = alarmId
	this.meta.name = name
	this.meta.url = url
    }

    return new ApiResult(deviceId, codes.success,
			 "Succesfully started playing audio.",
			 this.meta)
}

AudioManager.prototype.stop = function(deviceId){
    if(this.currentAudio != null){
	this.currentAudio.stdin.write(this.stopCommand)
	this.isRunningAudio = false
	this.currentAudio = null
	this.meta = null
	return new ApiResult(deviceId, codes.success,					     "Succesfully stopped playing audio.")
    }
}

AudioManager.prototype.play = function(deviceId, alarmId, name, url){
    this.stop(deviceId)
    return this.beginAudio(deviceId, alarmId, name, url)
}  

exports.AudioManager = AudioManager
