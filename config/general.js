/**
 * General Congiruations file.
 */

// Port
const PORT = process.env.PORT || 3000;

// Log level
const LOGLVL = process.env.LOGLVL || "dev";

// JWT Secret word or phrase
const JWTSECRET = process.env.JWTSECRET || "Secret JWT Word";

// Body parser mb data limit
const BPMBLIMIT = process.env.BPMBLIMIT || "100mb";

module.exports = { PORT, LOGLVL, JWTSECRET, BPMBLIMIT };