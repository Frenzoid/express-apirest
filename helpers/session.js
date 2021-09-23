/**
 * Helper that will manage session tokens.
 */
const { JWTSECRET, JWTEXPIRE } = require('../config/general.js');
const JWT = require('jsonwebtoken');

// Generates a new token.
function jwtGenerate(payload, expirationTime) {
    return JWT.sign(payload, JWTSECRET, { expiresIn: expirationTime });
}

// Bears a token.
function jwtBearToken(token) {
    if (!token)
        return false

    return "Bearer " + token;
}

// Unbears a token, leaving purely the token.
function jwtUnbearToken(token) {
    if (!token)
        return false

    let headerParts = token.split(' ');

    return headerParts;
}

// Generates a token and bears it.
function jwtGenerateBeared(token, expireDate) {
    return jwtBearToken(jwtGenerate(token, expireDate))
}

// Verifies the current token integrity.
function jwtVerify(tokenBeared) {

    let headerParts = jwtUnbearToken(tokenBeared);

    if (!headerParts || headerParts.length !== 2 || headerParts[0] !== 'Bearer') {
        return false;
    }

    const token = headerParts[1];

    // Verify secret and check token expiration.
    return JWT.verify(token, JWTSECRET, (error, payload) => {

        if (error)
            return false;

        return payload;

    });
}

// JWT middlewate to check token integrity, and refresh it.
function jwtMiddleware(req, res, next) {
    const tokenHeader = req.header('Authorization');

    const payload = jwtVerify(tokenHeader);

    if (!payload)
        return res.boom.unauthorized('Invalid token.')

    // If everything is good, save the user for its use in other middlewares and set header with a refreshed token.
    let token = jwtGenerate({ userid: payload.userid }, JWTEXPIRE);
    const tokenBeared = jwtBearToken(token);

    res.set('Authorization', tokenBeared);
    req.jwtpayload = payload;

    next();

}


module.exports = { jwtMiddleware, jwtGenerateBeared };