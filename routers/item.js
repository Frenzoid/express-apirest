/**
 * Items router. Connects with the user's endpoints, and catches errors.
 */
const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.js');

async function getItems(req, res, next) {
    try {
        return await itemController.getItems(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}

async function getItem(req, res, next) {
    try {
        return await itemController.getItem(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}

async function postItemToCurrentUser(req, res, next) {
    try {
        return await itemController.addItemToCurrentUser(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', postItemToCurrentUser);


module.exports = router