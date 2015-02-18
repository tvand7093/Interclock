/**
* Dependencies.
*/
var requireDirectory = require('require-directory');

// Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
var controller = requireDirectory(module, '../controllers');

module.exports = [
    {
	method: 'POST',
	path: '/search',
	config: controller.stations.search
    },
    {
	method: 'POST',
	path: '/play',
	config: controller.stations.play
    },
    {
	method: 'POST',
	path: '/stop',
	config: controller.stations.stop
    },
    {
	method: 'PUT',
	path: '/schedule',
	config: controller.stations.schedule
    },
    {
	method: 'DELETE',
	path: '/schedule/{alarmId}',
	config: controller.stations.scheduleCancel
    },
    {
	method: 'GET',
	path: '/status',
	config: controller.stations.status
    }
]
