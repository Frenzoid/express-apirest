/**
 * General Congiruations for all the app.
 */

// Port
const PORT = Number(process.env.PORT) || 3000;

// Log level
const LOGGERLVL = process.env.LOGGERLVL || "dev";

// JWT Secret word or phrase
const JWTSECRET = process.env.JWTSECRET || "Secret JWT Word";

// JWT expire time.
const JWTEXPIRE = process.env.JWTEXPIRE || "1h";

// Body parser mb data limit
const BPMBLIMIT = process.env.BPMBLIMIT || "100mb";

// Salt Level for user encryption
const SALTLVL = Number(process.env.SALTLVL) || 10;

// Log general config. Remove on prod.
console.log({ PORT, LOGGERLVL, JWTSECRET, BPMBLIMIT, SALTLVL })

module.exports = { PORT, LOGGERLVL, JWTSECRET, JWTEXPIRE, BPMBLIMIT, SALTLVL };