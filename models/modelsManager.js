const Item = require('./item.js');
const User = require('./user.js');

function issueRelations() {

    // User Relations.
    User.hasMany(Item);

    // Item relations.
    Item.belongsTo(User);
}


function createTablesFromModels() {

    // Sync all models.
    User.sync({ force: true });
    Item.sync({ force: true });
}

function insertFillerData() {

}

module.exports = { createTablesFromModels, insertFillerData, issueRelations };