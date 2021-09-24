const { Sequelize } = require('sequelize');
const { DBDIAL, DBNAME, DBUSER, DBPASS, DBHOST, DBLOGC } = require('./general.js');

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('postgres://root:root@oldbox:5432/example') // Example for postgres

// Option 2: Passing parameters separately (database, user, password)
const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS,
    {
        host: DBHOST,
        dialect: DBDIAL,
        logging: DBLOGC,
    }
);

module.exports = sequelize;