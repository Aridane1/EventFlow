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

db.Event = require("./events.model.js")(sequelize, Sequelize);
db.Location = require("./location.model.js")(sequelize, Sequelize);
db.User = require("./users.model.js")(sequelize, Sequelize);
db.Rol = require("./rols.model.js")(sequelize, Sequelize);
db.UserRol = require("./user-rol.model.js")(sequelize, Sequelize);
db.ClientSubscriptionMunicipality =
  require("./client-subscription-municipality.model.js")(sequelize, Sequelize);

db.Location.hasMany(db.Event);
db.Event.belongsTo(db.Location);
db.User.belongsToMany(db.Rol, { through: "user-rols" });
db.User.belongsToMany(db.Location, {
  through: "client-subscription-municipality",
});

module.exports = db;
