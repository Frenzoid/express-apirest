/**
 * Helper that will manage session tokens.
 */
const { JWTSECRET, JWTEXPIRE } = require('../config/general.js');
const JWT = require('jsonwebtoken');

// Generates a new token.
function jwtGenerate(payload) {

    // returns a JWT.
    return JWT.sign(payload, JWTSECRET, { expiresIn: JWTEXPIRE });
}

// Bears a token.
function jwtBearToken(token) {
    if (!token)
        return false;

    return "Bearer " + token;
}

// Unbears a token, returning both parts of the token.
function jwtUnbearToken(token) {
    if (!token)
        return false;

    // parts = ["Bearer", "JWT"]
    let parts = token.split(' ');

    return parts;
}

// Generates a token and bears it.
function jwtGenerateBeared(payload) {

    // returns a "Bearer JWT"
    return jwtBearToken(jwtGenerate(payload))
}

// Verifies the current token integrity.
function jwtVerify(tokenBeared) {

    let parts = jwtUnbearToken(tokenBeared);

    // Check if the parts are correct.
    if (!parts || parts.length !== 2 || parts[0] !== 'Bearer') {
        return false;
    }

    // Strip token from parts.
    const token = parts[1];

    // Verifies token integrity and checks token expiration, returns payload or throws an error.
    return JWT.verify(token, JWTSECRET, (error, payload) => {

        if (error && error.name === 'TokenExpiredError')
            throw 'Token expired'
        else if (error)
            throw 'generic error';

        return payload;

    });
}

// JWT middlewate to check token integrity, and refresh it.
function jwtMiddleware(req, res, next) {
    const tokenHeader = req.header('Authorization');
    let payload;

    // Verifies token, returns payload or throws error.
    try {
        payload = jwtVerify(tokenHeader);
    } catch (err) {
        if (err == 'Token expired')
            return res.boom.unauthorized('JWT token expired.');

        return res.boom.unauthorized('Invalid Token.');
    }

    // If everything is good, generate a new token, with the payload (current session user id)
    const token = jwtGenerateBeared({ userid: payload.userid });

    // Save the payload for its later use in endpoints if needed and set header with a refreshed token.
    res.set('Authorization', token);
    req.jwtpayload = payload;

    next();

}


module.exports = { jwtMiddleware, jwtGenerateBeared };