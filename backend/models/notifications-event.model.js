module.exports = (sequelize, Sequelize) => {
  const NotificationEvent = sequelize.define("notification-event", {
    title: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.TEXT,
    },
  });
  return NotificationEvent;
};
