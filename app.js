/**
* Dependencies.
*/
var Hapi = require('hapi'),
    config = require('./config/settings');

// Create a new server
var server = new Hapi.Server();

// Setup the server with a host and port
server.connection({host: config.host, port: config.port});

// Export the server to be required elsewhere.
module.exports = server;

// Add the server routes
server.route(require('./config/routes'));

//Start the server
server.start(function() {
    //Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);
});
