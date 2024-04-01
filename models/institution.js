const Sequelize = require("sequelize");
const database = require("../utils/database");

const institution = database.define("institution", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  logoImage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
 
module.exports = institution;