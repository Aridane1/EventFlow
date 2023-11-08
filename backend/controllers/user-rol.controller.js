const db = require("../models");
const UserRol = db.UserRol;

exports.create = (req, res) => {
  const userRol = {
    userId: req.body.userId,
    rolId: req.body.rolId,
  };
  UserRol.create(userRol)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al crear el registro.",
      });
    });
};

exports.getAll = (req, res) => {
  //Debe mostrar el correo del usuario y el rol
  UserRol.findAll().then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "No hay resultados.",
      });
    }
    return res.json(data);
  });
};
exports.delete = (req, res) => {
  const userId = req.params.userId;
  const rolId = req.params.rolId;

  UserRol.destroy({ where: { rolId: rolId, userId: userId } }).then((resul) => {
    console.log("Eliminado", resul);
    if (!resul) {
      return res.status(404).send({
        message: "No se ha podido eliminar",
      });
    } else {
      return res.send({
        message: "Registro Eliminado",
      });
    }
  });
};
