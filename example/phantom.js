var page = require('webpage').create(),
    debug = require('../')('PhantomJS:ExampleApp');
    url = 'http://www.phantomjs.org/';



debug("Loading a web page");
page.open(url, function (status) {
    debug("Page is loaded! (status: " + status + ")");
    phantom.exit();
});