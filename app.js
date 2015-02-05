
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ext = require('./misc/extensions.js');
var app = express();
var proc = require('child_process');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var mplayer = null;

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    var DirbleRepository = require('./repos/dirbleRepository.js');
    var d = new DirbleRepository();
    
    console.log("Searched for radio and found the following--------\n");
    d.searchForStation("radiodue", function(results){
	d.currentResults = results;
	console.log(d.currentResults);
	if(mplayer != null){
	    mplayer.kill('SIGINT');
	}

	//spawn it up!
	var curl = proc.spawn('curl', [results.streamurl]);
	
	curl.stdout.on('data', function (data) {
    	    //mplayer = curl.spawn('mplayer', ['-ao', 'openal',  data]);
	    mplayer = proc.exec('mplayer ' + data + ' > music.log');
	});
    });

});
