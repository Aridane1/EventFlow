const db = require("../models");
const UserRol = db.UserRol;
const User = db.User;
const Rol = db.Rol;

exports.create = (req, res) => {
  //Busca el correro electronico
  console.log(req.body.email);
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    Rol.findOne({ where: { nameRol: req.body.nameRol } }).then((rol) => {
      const userRol = {
        userId: user.id,
        rolId: rol.id,
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
exports.getOneUserRol = (req, res) => {
  let id = req.params.id;
  let arrayRol = [];

  UserRol.findAll({ where: { userId: id } }).then((data) => {
    if (!data || data.length === 0) {
      return res.status(404).send({
        message: "Registro no encontrado",
      });
    }

    const promises = data.map((item) => {
      return Rol.findByPk(item.rolId).then((rol) => {
        return rol.nameRol;
      });
    });

    Promise.all(promises)
      .then((roles) => {
        arrayRol = roles;

        return res.json(arrayRol);
      })
      .catch((error) => {
        return res.status(500).send({
          message: "Error al obtener los roles",
          error: error,
        });
      });
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
