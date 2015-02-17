﻿/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);

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

app.use(express.static(path.join(__dirname, 'public/scripts')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//sockets and repo setup
require('./repos/socket').SocketManager(http, app)



http.listen(app.get('port'))
