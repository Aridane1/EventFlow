module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    location_img: {
      type: Sequelize.TEXT,
    },
  });
  return Location;
};
