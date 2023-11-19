module.exports = (sequelize, Sequelize) => {
  const NotificationMunicipality = sequelize.define(
    "notification-municipality",
    {
      title: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.TEXT,
      },
      locationIds: {
        type: Sequelize.BLOB,
      },
    }
  );

  return NotificationMunicipality;
};
