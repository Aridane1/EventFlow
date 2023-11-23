module.exports = (sequelize, Sequelize) => {
  const UserSubscriptionEvent = sequelize.define("user-subscription-event", {
    userId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    eventId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  });
  return UserSubscriptionEvent;
};
