const Item = require("../models/item");
const User = require("../models/user");

/**
 * User controller, here you'll be managing all bussiness logic.
 */
async function getAllUsers(_, res) {
    return res.json(await User.findAll({ attributes: { exclude: ['password'] }, include: [{ model: Item }] }));
}

async function getUserByName(req, res) {
    const user = await User.findOne({ where: { name: req.params.name }, attributes: { exclude: ['password'] }, include: [{ model: Item }] });

    if (!user)
        return res.boom.notFound("User '" + req.params.name + "' not found.");

    return res.json(user);
}

async function getCurrentUser(req, res) {
    const user = await User.findByPk(req.jwtpayload.userid, { attributes: { exclude: ['password'] }, include: [{ model: Item }] });
    res.json(user);
}

module.exports = { getAllUsers, getUserByName, getCurrentUser }