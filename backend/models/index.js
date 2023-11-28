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

db.UserSubscriptionEvent = require("./user-subsciption-event.model.js")(
  sequelize,
  Sequelize
);

db.NotificationEvent = require("./notifications-event.model.js")(
  sequelize,
  Sequelize
);
db.RelationNotificationEvent =
  require("./relation-notification-event.model.js")(sequelize, Sequelize);

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

db.User.hasMany(db.UserSubscriptionEvent, { foreignKey: "userId" });
db.Event.hasMany(db.UserSubscriptionEvent, {
  foreignKey: "eventId",
});

db.UserSubscriptionEvent.belongsTo(db.User, {
  foreignKey: "userId",
});
db.UserSubscriptionEvent.belongsTo(db.Event, {
  foreignKey: "eventId",
});

db.Event.hasMany(db.RelationNotificationEvent, {
  foreignKey: "eventId",
});
db.NotificationEvent.hasMany(db.RelationNotificationEvent, {
  foreignKey: "notificationId",
});

db.RelationNotificationEvent.belongsTo(db.Event, {
  foreignKey: "eventId",
});
db.RelationNotificationEvent.belongsTo(db.NotificationEvent, {
  foreignKey: "notificationId",
});

module.exports = db;
