module.exports = (sequelize, Sequelize) => {
  const ClientSubscriptionMunicipality = sequelize.define(
    "client-subscription-municipality",
    {
      userId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      locationId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      endpoint: {
        type: Sequelize.TEXT,
      },
      auth: {
        type: Sequelize.STRING,
      },
      p256dh: {
        type: Sequelize.STRING,
      },
    }
  );
  return ClientSubscriptionMunicipality;
};
