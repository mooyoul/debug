
/**
 * Module dependencies.
 */

var process = require('system'); // for phantom compatiable

/**
 * This is the PhantomJS implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
    var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
    if (0 === debugColors.length) {
        return true; // always tty
    } else {
        return '0' !== debugColors
            && 'no' !== debugColors
            && 'false' !== debugColors
            && 'disabled' !== debugColors;
    }
}

/**
 * Formatting for Strings.
 * PhantomJS Console does not support format specifiers.
 */

exports.formatters.s = function (v) {
    return "" + v;
};


/**
 * Formatting for Objects.
*/

exports.formatters.o = function(v) {
    return (Object.prototype.toString.call(v) + ' ' + JSON.stringify(v));
};


/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs() {
    var args = arguments;
    var useColors = this.useColors;
    var name = this.namespace;

    if (useColors) {
        var c = this.color;

        args[0] = '  \u001b[9' + c + 'm' + name + ' '
            + '\u001b[0m'
            + args[0] + '\u001b[3' + c + 'm'
            + ' +' + exports.humanize(this.diff) + '\u001b[0m';
    } else {
        args[0] = new Date().toUTCString()
            + ' ' + name + ' ' + args[0];
    }
    return args;
}

/**
 * Invokes `console.log()` with the specified arguments.
 */

function log() {
    return console.log.apply(console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
    if (null == namespaces) {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    } else {
        process.env.DEBUG = namespaces;
    }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
    return process.env.DEBUG;
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());
