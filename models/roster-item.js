const Sequelize = require("sequelize");
const database = require("../utils/database");

const RosterItem = database.define("rosterItem",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = RosterItem;