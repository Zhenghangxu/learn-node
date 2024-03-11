const Sequelize = require("sequelize");
const database = require("../utils/database");

const Course = database.define("course", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  currentEnrollment: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  shortDesc: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  longDesc: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Course;
