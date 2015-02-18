var ext = require('../misc/extensions')
var CronJob = require('cron').CronJob
var uuid = require('node-uuid')
var daysOfWeek = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    weekdays: 7,
    weekends: 8
}
var self = {}

function Scheduler(){
    this.alarms = {}
    self = this
}

Scheduler.prototype.list = function(){
    return self.alarms
}

Scheduler.prototype.cancelAlarm = function(alarmId){

    var alarm = self.alarms[alarmId];
    if(alarm != null){
	//alarm found, so shut it off.
	console.log("Canceled alarm.")
	alarm.stop()
	self.alarms[alarmId] = null
    }
}

Scheduler.prototype.createAlarm = function(hour, min,
				beginDay, endDay, alarmAction){
    var runRange = '*'
    if(beginDay != endDay){
	//detemined a day range.
	runRange = beginDay + '-' + endDay
    }
    else{
	//same, so must be weekend or weekdays
	if(beginDay == daysOfWeek.weekdays){
	    runRange = daysOfWeek.monday + '-' + daysOfWeek.friday
	}
	else if (beginDay == daysOfWeek.weekends) {
	    //weekend
	    runRange = daysOfWeek.friday + '-' + daysOfWeek.sunday
	}
	else {
	    //single day, so set that.
	    runRange = beginDay
	}
    }

    var cronString = "%s %s * * %s".format(min, hour, runRange)
    var alarmId = uuid.v4()
    var alarm = new CronJob(cronString,
			    function() {
				alarmAction()
			    },
			    function(){
				self.alarms[alarmId].stop()
				//ran so remove this from queue
				self.alarms[alarmId] = null
			    },
			    true, "America/Los_Angeles")
	self.alarms[alarmId] = alarm
    
    return alarmId
}

exports.Scheduler = Scheduler
