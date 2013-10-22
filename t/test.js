var test    = require('tape')
var Greeter = require('../index')

var stub = {
    setup: function () {
        this.clear()

        this._.getUTCHours   = Date.prototype.getUTCHours
        this._.getUTCMinutes = Date.prototype.getUTCMinutes

        var that = this
        Date.prototype.getUTCHours   = function () { return that.buf.hour }
        Date.prototype.getUTCMinutes = function () { return that.buf.min }
    }
  , teardown: function () {
        Date.prototype.getUTCHours   = this._.getUTCHours
        Date.prototype.getUTCMinutes = this._.getUTCMinutes
    }
  , clear: function () {
        this._   = {}
        this.buf = {}
    }
}

test('load modules', function (t) {
    t.equal(typeof Greeter, 'function', 'Greeter ok')
    t.end()
})
test('new', function (t) {
    var greeter = new Greeter
    t.ok(greeter, 'greeter = new Greeter')
    t.ok(greeter instanceof Greeter, 'greeter instanceof Greeter')
    t.equal(typeof greeter.greet, 'function', 'typeof greeter.greet === "function"')
    t.end()
})
test('.greet()', function (t) {
    t.test('* stub works as expected', function (tt) {
        stub.setup()
        stub.buf.hour = 'bar'
        stub.buf.min  = 'foo'
        var d = new Date
        tt.equal(d.getUTCHours(), 'bar')
        tt.equal(d.getUTCMinutes(), 'foo')
        stub.teardown()
        tt.end()
    })

    t.test('greeter.greet() returns the expected greet', function (tt) {
        function subt (hour, min, mes) {
            stub.clear()
            stub.buf.hour = hour - 9
            stub.buf.min  = min
            tt.equal((new Greeter).greet(), mes, mes)
        }
        stub.setup()

        subt(5, 10, 'Good Morning')
        subt(11, 59, 'Good Morning')
        subt(12, 0, 'Good Afternoon')
        subt(17, 59, 'Good Afternoon')
        subt(18, 0, 'Good Evening')
        subt(24, 0, 'Good Evening')
        subt(0, 0, 'Good Evening')
        subt(27, 0, 'Good Evening')
        subt(29, 0, 'Good Morning')

        stub.teardown()
        tt.end()
    })

    t.end()
})
