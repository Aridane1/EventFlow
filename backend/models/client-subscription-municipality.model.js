module.exports = (sequelize, Sequelize) => {
  const ClientSubscriptionMunicipality = sequelize.define(
    "client-subscription-municipality",
    {
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      locationId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    }
  );
  return ClientSubscriptionMunicipality;
};
