var ext = require('../misc/extensions');
var proc = require('child_process');
var Results = require('./apiCodes');
var codes = Results.statusCodes;
var ApiResult = Results.ApiResult;

function AudioManager(){
    this.isRunningAudio = false;
    this.mPlayer = 'mplayer';
    this.nullDev = '/dev/null';
    this.killAll = 'killall';
    this.playerCommand = "%s %s > %s";
    this.currentAudio = {};
}


AudioManager.prototype.generatePlayCommand = function(url){
    return this.playerCommand.format(
	this.mPlayer, url, this.nullDev);
};

AudioManager.prototype.beginAudio = function(url){
    proc.exec(this.generatePlayCommand(url));
    this.isRunningAudio = true;
    return new ApiResult(codes.success, "Succesfully started playing audio.");

};

AudioManager.prototype.stop = function(){
    if(!this.isRunningAudio){
	return new ApiResult(codes.success, "No audio is playing.");
    }
    
    if(this.isRunningAudio){
	proc.spawn(this.killAll, [this.mPlayer]);
	this.isRunningAudio = false;
	return new ApiResult(codes.success,"Audio stopped successfully.");
    }
    else{
	return new ApiResult(codes.error, "Error stopping the audio.");
    }
};

AudioManager.prototype.play = function(url){
    this.stop();
    return this.beginAudio(url); 
};  

exports.AudioManager = AudioManager;
