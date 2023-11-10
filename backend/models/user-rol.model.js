module.exports = (sequelize, Sequelize) => {
  const UserRol = sequelize.define("user-rols", {
    //no se debe de crear un campo id
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    rolId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  });
  return UserRol;
};
