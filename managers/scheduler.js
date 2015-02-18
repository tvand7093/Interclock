var ext = require('../misc/extensions')
var CronJob = require('cron').CronJob

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

Scheduler.prototype.createAlarm = function(alarmId, hour, min,
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
    var alarm = new CronJob(cronString,
			    function() {
				alarmAction()
			    },
			    null,
			    true, "America/Los_Angeles")
	self.alarms[alarmId] = alarm
}

exports.Scheduler = Scheduler
