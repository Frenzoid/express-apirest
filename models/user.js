/**
 * User model.
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const { SALTLVL } = require('../config/general.js');

const Item = require('./item');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


// Before each insert or update..
User.beforeCreate(async (user) => {
    const salt = bcrypt.genSaltSync(SALTLVL);
    user.password = bcrypt.hashSync(user.password, salt);
});

User.beforeUpdate(async (user) => {
    const salt = bcrypt.genSaltSync(SALTLVL);
    user.password = bcrypt.hashSync(user.password, salt);
});


// Custom class method.
User.checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}


module.exports = User;