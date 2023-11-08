module.exports = (sequelize, Sequelize) => {
  const Rol = sequelize.define("rol", {
    nameRol: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  });
  return Rol;
};
