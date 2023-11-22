module.exports = (sequelize, Sequelize) => {
  const NotificationMuni = sequelize.define("notification-muni", {
    title: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.TEXT,
    },
  });

  return NotificationMuni;
};
