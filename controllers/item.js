const Item = require("../models/item");
const User = require("../models/user");

/**
 * Item controller, here you'll be managing all bussiness logic.
 */
async function getItems(req, res) {
    return res.json(await Item.findAll({ include: [{ model: User }] }));
}


async function getItem(req, res) {
    return res.json(await Item.findByPk(req.params.id, { include: [{ model: User }] }));
}


async function addItemToCurrentUser(req, res) {

    let item = await Item.findByPk(req.params.id);

    if (!item) res.boom.notFound("Item with id '" + req.params.id + "'not found");

    const currentUser = await User.findByPk(req.jwtpayload.userid);

    currentUser.addItem(item);
}

module.exports = { getItems, getItem, addItemToCurrentUser }