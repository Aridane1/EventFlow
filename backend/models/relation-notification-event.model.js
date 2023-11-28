module.exports = (sequelize, Sequelize) => {
  const RelationNotificationEvent = sequelize.define(
    "relation-notification-event",
    {
      notificationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    }
  );
  return RelationNotificationEvent;
};
