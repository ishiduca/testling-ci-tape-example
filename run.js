var args = phantom.args

if (args.length < 1 || args.length > 2) {
    console.log('usage: phantomjs run.js URL [timeout]')
    phantom.exit(1)
}

var url     = args[0]
var timeout = args[1] ? parseInt(args[0], 10) : 5001

var page = require('webpage').create()
page.onConsoleMessage = function (mes) {
    console.log(mes)
    if (/^# (ok|fail)/.test(mes)) return phantom.exit(RegExp.$1 !== 'ok' ? 1 : 0)
}

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('unable to access network')
        return phantom.exit(1)
    }

    setTimeout(function () {
        console.log('Timeout')
        return phantom.exit(1)
    }, timeout)
})

