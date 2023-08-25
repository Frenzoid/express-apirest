/**
 * Items router. Connects with the user's endpoints, and catches errors.
 */
const express = require('express');
const router = express.Router();

const { errorHandler } = require("../helpers/functions")
const { getItems, getItem, addItemToCurrentUser } = require('../controllers/item.js');



router.get('/', errorHandler(getItems));
router.get('/:id', errorHandler(getItem));
router.post('/', errorHandler(addItemToCurrentUser));


module.exports = router