const Sequelize = require("sequelize");
const database = require("../utils/database");

const Roster = database.define("catelog",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Roster;