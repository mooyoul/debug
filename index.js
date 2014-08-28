/**
 * This is the main script of `debug()`.
 *
 */


module.exports = exports = (typeof process !== 'undefined') ? require('./node') : require('./phantom');