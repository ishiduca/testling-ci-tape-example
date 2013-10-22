;(function (global) {
'use strict'
var isBrowser = !! global.self
var isWorker  = !! global.WorkerLocation
var isNodeJS  = !! global.global

function Greeter () {}

Greeter.prototype.greets = ['Good Morning','Good Afternoon','Good Evening']
Greeter.prototype.timezoneOffset = -540
Greeter.prototype.greet = function () {
    return this.greets[this.getGreetsIndex(this.getNow())]
}
Greeter.prototype.getGreetsIndex = function (n) {
    return   n >= 18 * 60 ? 2
           : n >= 12 * 60 ? 1
           : n >=  5 * 60 ? 0 : 2
}
Greeter.prototype.getNow = function () {
    var now = new Date
    var utc = now.getUTCHours() * 60 + now.getUTCMinutes()
    return (utc - this.timezoneOffset + (24 * 60)) % (24 * 60)
}

//if (isNodeJS) {
    module.exports = Greeter
//} else {
//    global.Greeter = Greeter
//}

})(this.self || global)
