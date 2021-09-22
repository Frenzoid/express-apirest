const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('postgres://root:root@oldbox:5432/example') // Example for postgres

// Option 2: Passing parameters separately (database, user, password)
const sequelize = new Sequelize("example", "root", "root",
    {
        host: "oldbox.cloud",
        dialect: "postgres",
        logging: false,
    }
);

module.exports = sequelize;