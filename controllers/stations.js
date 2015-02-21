var Manager = require('../managers/manager').Manager
var manager = new Manager()
var Joi = require('joi')

module.exports = {
    search: {
	handler: manager.searchREST,
	id: 'search',
	validate: {
	    payload: {
		search: Joi.string().min(1).required(),
		deviceId: Joi.string().min(1).required(),
	    }
	}
    },
    play: {
	handler: manager.playREST,
	id: 'play',
	validate: {
	    payload: {
		stationId: Joi.number().min(1).required(),
		deviceId: Joi.string().min(1).required(),
	    }
	}
    },
    stop: {
	handler: manager.stopREST,
	id: 'stop',
	validate: {
	    payload: {
		alarmId: Joi.string().min(1).required(),
		deviceId: Joi.string().min(1).required(),
	    }
	}
    },
    schedule: {
	handler: manager.scheduleREST,
	id: 'schedule',
	validate: {
	    payload: {
		hour: Joi.number().min(0).max(23).required(),
		minute: Joi.number().min(0).max(59).required(),
		beginDay: Joi.number().min(0).max(8).required(),
		endDay: Joi.number().min(0).max(8).required(),
		deviceId: Joi.string().min(1).required(),
		stationId: Joi.number().min(1).required()
	    }
	}
    },
    scheduleCancel: {
	handler: manager.scheduleStopREST,
	id: 'scheduleCancel',
	validate: {
	    params: {
		alarmId: Joi.string().min(1).required(),
	    }
	}
    },
    status: {
	handler: manager.statusREST,
	id: 'status'
    },
}
