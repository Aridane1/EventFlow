module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    profile_picture: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    aboutMe: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });

  return User;
};
