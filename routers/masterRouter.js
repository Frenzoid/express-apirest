/**
 * This file collects all routers,
 * so that server.js can access them from just one file.
 */

const auth = require('./auth.js');
const user = require('./user.js');
const item = require('./item.js');

module.exports = { user, item, auth }