/**
 * User router. Connects with the user's endpoints, and catches errors.
 */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');

async function getUsers(req, res, next) {
    try {
        return await userController.getAllUsers(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}

async function getUser(req, res, next) {
    try {
        return await userController.getUserByName(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}


async function getCurrentUser(req, res, next) {
    try {
        return await userController.getCurrentUser(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}

router.get('/', getUsers);
router.get('/current', getCurrentUser);
router.get('/:name', getUser);


module.exports = router