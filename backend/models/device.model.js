module.exports = (sequelize, Sequelize) => {
  const Device = sequelize.define("device", {
    endpoint: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    keys: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Device;
};
