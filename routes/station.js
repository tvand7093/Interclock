var DirbleRepository = require('../repos/dirbleRepository.js');
var proc = require('child_process');
var api = new DirbleRepository();

function stopCurrentlyRunning(){
    if(api.runningAudio.length > 0){
	proc.spawn('killall', ['mplayer']);
	api.runningAudio.pop();
    }
}

function playStation(station){
    stopCurrentlyRunning();
    //spawn it up!
    var curl = proc.spawn('curl', [station.streamurl]);
    curl.stdout.on('data', function (data) {
	api.runningAudio.push(proc.exec('mplayer ' + data + ' > /dev/null'));
    });
}

exports.radiodue  = function(req, res){
    //start radio due
    api.searchForStation("radiodue", function(station){
	playStation(station);
    });
    
  res.send("Playing RAI Radio Due!");
};


exports.radiotre  = function(req, res){
    //start radio due
    api.searchForStation("radiotre", function(station){
	playStation(station);
    });
    
  res.send("Playing RAI Radio Tre!");
};

exports.off  = function(req, res){
    //stop all radio from playing
    stopCurrentlyRunning();
    
  res.send("Alarm has been turned off!");
};


