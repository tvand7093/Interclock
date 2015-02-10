var ext = require('../misc/extensions');
var proc = require('child_process');
var Results = require('./apiCodes');
var codes = Results.statusCodes;
var ApiResult = Results.ApiResult;
var io = require('socket.io')

function AudioManager(){
    this.isRunningAudio = false;
    this.mPlayer = 'mplayer';
    this.nullDev = '/dev/null';
    this.killAll = 'killall';
    this.playerCommand = "%s %s";
    this.currentAudio = {}
    this.play = "play";
    this.stop = "stop"

    io.on('connection', function (socket){
	socket.on('audioResult', function(data){
	    io.emit('audioResult', data)
	})
    })
    
    //require volume to be up.
    var vol = path.join(__dirname, 'scripts', 'vol.sh') +
	' 95 2> logs/audioError.log';
    proc.exec(vol);
}

AudioManager.prototype.beginAudio = function(url){
    if(this.currentAudio == null){
	this.currentAudio = proc.spawn(this.mPlayer, [url])

	this.currentAudio.stdout.on(function (stdout){
	    console.log(stdout);
	});
	this.currentAudio.stdin.on(function(stdin){
	    //check what command is being processed
	    if(stdin == this.stop) {
		this.isRunningAudio = false
		io.emit('audioResult', new ApiResult(codes.success,
					       "Succesfully stopped playing audio."))
	    }
	    if(stdin == this.play) {
		this.isRunningAudio = true
		io.emit('audioResult', new ApiResult(codes.success,
					       "Succesfully started playing audio."))
	    }
	});

	this.currentAudio.stderr.on(function(stderr){
	    var msg = this.isRunningAudio ? "Error while playing audio." :
		"Error starting audio."
	    this.isRunningAudio = false
	    io.emit('audioResult', new ApiResult(codes.error, msg))
	});
    }
    //send command to mplayer to play audio.
    this.CurrentAudio.stdin.write(this.play)    
};

AudioManager.prototype.stop = function(){
    if(!this.isRunningAudio){
	io.emit('audioResult',
			 new ApiResult(codes.success, "No audio is playing"))
    }
    this.currentAudio.stdin.write(this.stop)    
};

AudioManager.prototype.play = function(url){
    this.stop()
    this.beginAudio(url)
};  

exports.AudioManager = AudioManager;
