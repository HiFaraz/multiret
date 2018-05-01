const group = require('./group');
const retry = require('./retry');
const wrap = require('./wrap');

wrap.default = wrap; // for ES module imports
wrap.group = group;
wrap.retry = retry;

module.exports = wrap;
