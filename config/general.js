/**
 * General Congiruations for all the app.
 */

// Port
const PORT = Number(process.env.PORT) || 3000;

// Body parser mb data limit
const BPMBLIMIT = process.env.BPMBLIMIT || "100mb";


// Log level
const LOGGERLVL = process.env.LOGGERLVL || "dev";


// JWT Secret word or phrase
const JWTSECRET = process.env.JWTSECRET || "Secret JWT Word";

// JWT expire time.
const JWTEXPIRE = process.env.JWTEXPIRE || "1h";


// Type of dialect (kind of database: mysql, postgres, maria...)
const DBDIAL = process.env.DBDIAL || "postgres";

// Database name.
const DBNAME = process.env.DBNAME || "example";

// User databse username.
const DBUSER = process.env.DBUSER || "root";

// User database password.
const DBPASS = process.env.DBPASS || "root";

// Database server address (ip or hostname).
const DBHOST = process.env.DBHOST || "oldbox.cloud";

// Enable database logging to node console.
const DBLOGC = (process.env.DBLOGC == 'true' ? true : false) || false;


// Salt Level for user password encryption
const SALTLVL = Number(process.env.SALTLVL) || 10;


const config = {
    PORT,
    BPMBLIMIT,
    LOGGERLVL,
    JWTSECRET,
    JWTEXPIRE,
    DBDIAL,
    DBNAME,
    DBUSER,
    DBPASS,
    DBHOST,
    DBLOGC,
    SALTLVL
}

// Log general config. Remove on prod.
// console.log(config)

module.exports = config;