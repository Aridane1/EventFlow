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
db.ClientSubscriptionMunicipality =
  require("./client-subscription-municipality.model.js")(sequelize, Sequelize);
db.NotificationMuni = require("./notifications-muni.model.js")(
  sequelize,
  Sequelize
);
db.NotificationMunicipality = require("./notifications-municipality.model.js")(
  sequelize,
  Sequelize
);
db.Device = require("./device.model.js")(sequelize, Sequelize);

db.Location.hasMany(db.Event);
db.Event.belongsTo(db.Location, { foreignKey: "locationId" });

db.User.hasMany(db.ClientSubscriptionMunicipality, { foreignKey: "userId" });
db.Location.hasMany(db.ClientSubscriptionMunicipality, {
  foreignKey: "locationId",
});

db.ClientSubscriptionMunicipality.belongsTo(db.User, {
  foreignKey: "userId",
});
db.ClientSubscriptionMunicipality.belongsTo(db.Location, {
  foreignKey: "locationId",
});

db.Location.hasMany(db.NotificationMunicipality, {
  foreignKey: "locationId",
});
db.NotificationMuni.hasMany(db.NotificationMunicipality, {
  foreignKey: "notificationId",
});

db.NotificationMunicipality.belongsTo(db.Location, {
  foreignKey: "locationId",
});
db.NotificationMunicipality.belongsTo(db.NotificationMuni, {
  foreignKey: "notificationId",
});

db.User.hasMany(db.Device);
db.Device.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
