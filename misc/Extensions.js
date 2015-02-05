var util = require('util');

String.prototype.format = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.valueOf());
    return util.format.apply(util, args);
};