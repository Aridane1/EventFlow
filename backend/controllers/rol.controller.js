const db = require("../models");
const Rol = db.Rol;

exports.create = (req, res) => {
  console.log(req.body.nameRol);
  const newRol = {
    nameRol: req.body.nameRol,
  };
  console.log(newRol);
  Rol.create(newRol)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the rol.",
      });
    });
};

exports.getAll = (req, res) => {
  Rol.findAll()
    .then((allRol) => {
      if (!allRol) {
        return res.status(404).send({
          message: "No roles were found",
        });
      }
      res.send(allRol);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: err.message || "Error retrieving roles.",
      });
    });
};
