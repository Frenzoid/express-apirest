/**
 * Item model.
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');

const Item = sequelize.define('item', {
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
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quanity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
});


module.exports = Item;