/**
 * Auth router. Connects with the user's endpoints, and catches errors.
 */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.js');

async function postLogin(req, res, next) {
    try {
        return await authController.postLogin(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}

async function postRegister(req, res, next) {
    try {
        return await authController.postRegister(req, res, next);
    }
    catch (err) {
        console.error(err)
        return res.boom.badImplementation();
    }
}


router.post('/login', postLogin);
router.post('/register', postRegister);


module.exports = router