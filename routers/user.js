/**
 * User router. Connects with the user's endpoints, and catches errors.
 */
const express = require('express');
const router = express.Router();

const { errorHandler } = require("../helpers/functions")
const { getAllUsers, getUserByName, getCurrentUser } = require('../controllers/user.js');



router.get('/', errorHandler(getAllUsers));
router.get('/current', errorHandler(getCurrentUser));
router.get('/:name', errorHandler(getUserByName));


module.exports = router