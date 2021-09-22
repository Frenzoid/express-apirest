/**
 * @author MrFrenzoid
 */

// Force strict mode-
'use strict';

// We grab our libraries.
require('dotenv').config({ path: './utils/.env' });
const express = require('express');
const boom = require('express-boom');
const bparser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');


// We grab the configuration items we need.
const Config = require('./config/general.js');

// We grab our helpers
const sessionManager = require('./helpers/session')

// We grab our routers.
const Routers = require('./routers/masterRouter.js');

// express app.
const app = express();


// Error standarization.
app.use(boom());

// Body parser configuration
app.use(bparser.json({ limit: Config.BPMBLIMIT }));
app.use(bparser.urlencoded({ extended: true }));

// Logger to console.
app.use(logger(Config.LOGLVL));

// Enable cors
app.use(cors())


// A default endpoint (you can remove this, used to check if the apirest works).
app.get('/api', (_, res) => {
    res.status(200).send('API works.');
});


// Our route routers.
app.use('/api/auth', Routers.auth);
app.use('/api/users', sessionManager.jwtVerify, Routers.user);
app.use('/api/items', sessionManager.jwtVerify, Routers.item);


// And we start the server! :D
app.listen(Config.PORT, () => {
    console.info(`Express server listening on port ${Config.PORT}`);
});