const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    operatorsAliases: false,
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Event = require("./event.model.js")(sequelize, Sequelize);

module.exports = db;
