const { jwtGenerateBeared } = require("../helpers/session");

const User = require("../models/user");
const Item = require("../models/item");

/**
 * Auth controller, here you'll be managing all bussiness logic.
 */
async function login(req, res) {

    const { email, password } = req.body;

    if (!password || !email)
        return res.boom.badRequest("Missing password or email.");

    let user = await User.findOne({ where: { email: email } });

    if (!user)
        return res.boom.notFound("User with email '" + email + "' not found.");

    console.log(password, user.password);

    if (!(User.checkPassword(password, user.password)))
        return res.boom.unauthorized("Invalid credentials.");


    delete user.dataValues.password;
    res.set('Authorization', jwtGenerateBeared({ userid: user.id }));
    return res.json(user);
}


async function register(req, res) {

    if (await User.findOne({ where: { email: req.body.email } }))
        return res.boom.conflict("Email already registered!");


    let user;

    try {
        user = await User.create(req.body);
    }
    catch (err) {
        return res.boom.badRequest(err);
    }

    // Example of associating one model to another in a M:1 relation.
    // const item = await Item.create({ name: "Master key.", description: "A master key of the mansion." })
    // await user.addItem(item);

    // Find the user again, populating the previously added item.
    // user = await User.findByPk(user.id, { include: [{ model: Item }] });


    // Or you can also do directly:
    // This one creates a new item, and associates it to a user, returning the created item.
    await user.createItem({ name: "Master key.", description: "A master key of the mansion." });
    user = await User.findByPk(user.id, { include: [{ model: Item }] });

    delete user.dataValues.password;
    res.set('Authorization', jwtGenerateBeared({ userid: user.id }));
    return res.json(user);
}


module.exports = { login, register }