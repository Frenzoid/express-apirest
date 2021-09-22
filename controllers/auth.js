const { jwtGenerate } = require("../helpers/session");
const User = require("../models/user")

/**
 * Auth controller, here you'll be managing all bussiness logic.
 */
async function postLogin(req, res, next) {
}


async function postRegister(req, res, next) {
    const userParsed =
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    const user = await User.create(userParsed);
    console.log(User.checkPassword(req.body.password, user.password)); // true

    res.set('authorization', jwtGenerate({ userid: user.id }, '1h'));
    res.json(user);
}


module.exports = { postLogin, postRegister }