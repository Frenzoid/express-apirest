/**
 * Helper that will manage session tokens.
 */
const JWT = require('jsonwebtoken');
const Config = require('../config/general.js');

// Generates a new token.
function jwtGenerate(payload, expirationTime) {
    return JWT.sign(payload, Config.JWTSECRET, { expiresIn: expirationTime });
}

// Verifies the current token integrity.
function jwtVerify(tokenBeared) {

    let headerParts = ['', ''];

    if (tokenBeared)
        headerParts = tokenBeared.split(' ');

    if (headerParts.length !== 2 || headerParts[0] !== 'Bearer') {
        return res.boom.unauthorized('Invalid authorization header');
    }

    const token = headerParts[1];

    // Verify secret and check token expiration
    JWT.verify(token, Config.JWTSECRET, (error, payload) => {

        if (error)
            return false;

        return payload;

    });
}

// JWT middlewate to check token integrity.
function jwtMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization;
    const payload = jwtVerify(tokenHeader);

    if (!payload)
        res.boom.unauthorized('Invalid token.')

    // If everything is good, save the user for its use in other middlewares and set header with a refreshed token.
    let token = jwtGenerate(payload, '1h');
    const tokenBeared = "Bearer " + token;

    res.set('authorization', tokenBeared);
    req.userObject = payload;

    next();

}
module.exports = { jwtGenerate, jwtVerify, jwtMiddleware };