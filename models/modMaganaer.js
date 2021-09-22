const User = require('./user.js');


function createTablesFromModels() {

    // Sync all models.
    User.sync({ alter: true });
}

function insertFillerData() {

}

module.exports = { createTablesFromModels, insertFillerData };