/**
 * @author MrFrenzoid
 */

// Force strict mode.
'use strict';

// We grab our libraries.
require('dotenv').config({ path: './utils/.env' });
const express = require('express');
const boom = require('express-boom');
const bparser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');


// We grab the configuration items we need.
const { PORT, BPMBLIMIT, LOGLVL } = require('./config/general.js');

// We grab our database connector and tables generator.
const sequelize = require("./config/database.js");
const { createTablesFromModels } = require("./models/modelsManager.js");

// We grab our helpers
const { jwtMiddleware } = require('./helpers/session')

// We grab our routers.
const Routers = require('./routers/masterRouter.js');

// express app.
const app = express();


// Error standarization.
app.use(boom());

// Body parser configuration
app.use(bparser.json({ limit: BPMBLIMIT }));
app.use(bparser.urlencoded({ extended: true }));

// Logger to console.
app.use(logger(LOGLVL));

// Enable cors
app.use(cors())


// A default endpoint (you can remove this, used to check if the apirest works).
app.get('/api', (_, res) => {
    res.status(200).send('API works.');
});


// Our route routers.
app.use('/api/auth', Routers.auth);
app.use('/api/users', jwtMiddleware, Routers.user);
app.use('/api/items', jwtMiddleware, Routers.item);


// Once the connection to the database is done, we start the server! :D
try {
    (async () => {

        await sequelize.authenticate();
        console.log('Connection with the database has been established successfully.');

        // Create all tables from models.
        createTablesFromModels();

        app.listen(PORT, () => {
            console.info(`Express server listening on port ${PORT}`);
        });

    })();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
