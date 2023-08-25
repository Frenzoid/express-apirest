/**
 * Auth router. Connects with the user's endpoints, and catches errors.
 */
const express = require('express');
const router = express.Router();

const { errorHandler } = require("../helpers/functions")
const { login, register } = require('../controllers/auth.js');





router.post('/login', errorHandler(login));
router.post('/register', errorHandler(register));


module.exports = router