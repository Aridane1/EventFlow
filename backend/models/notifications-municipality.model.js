module.exports = (sequelize, Sequelize) => {
  const NotificationMunicipality = sequelize.define(
    "notification-municipality",
    {
      notificationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      locationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    }
  );

  return NotificationMunicipality;
};
