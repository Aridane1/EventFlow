const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const utils = require("../utils");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  const requiredFields = ["name", "email", "password", "rol"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol,
  };

  User.findOne({ where: { email: req.body.email } }).then((data) => {
    if (data) {
      const result = bcrypt.compareSync(newUser.password, data.password);
      if (!result) return res.status(401).send("Password not valid!");
      const token = utils.generateToken(data);
      // get basic user details
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token });
    }

    newUser.password = bcrypt.hashSync(req.body.password);

    User.create(newUser)
      .then((data) => {
        const token = utils.generateToken(data);
        // get basic user details
        const userObj = utils.getCleanUser(data);
        return res.json({ user: userObj, access_token: token });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      });
  });
};

exports.createAdmin = (req, res) => {
  const requiredFields = ["name", "email", "password", "rol"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol,
  };

  User.findOne({ where: { email: req.body.email } }).then((data) => {
    if (data) {
      const result = bcrypt.compareSync(newUser.password, data.password);
      if (!result) return res.status(401).send("Password not valid!");
      const token = utils.generateToken(data);
      // get basic user details
      const userObj = utils.getCleanUser(data);
      return res.json({ user: userObj, access_token: token });
    }

    newUser.password = bcrypt.hashSync(req.body.password);

    User.create(newUser)
      .then((data) => {
        const token = utils.generateToken(data);
        // get basic user details
        const userObj = utils.getCleanUser(data);
        return res.json({ user: userObj, access_token: token });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      });
  });
};

exports.getAll = (req, res) => {
  User.findAll()
    .then((allUsers) => {
      if (!allUsers) {
        return res.status(404).send({
          message: "No users were found",
        });
      }
      res.send(allUsers);
    })
    .catch((error) => {
      console.log("Error in getting all users", error);
      return res.status(500).json({
        success: false,
        message: "Error retrieving users from database",
      });
    });
};

exports.updateRol = (req, res) => {
  if (!req.body.rol) {
    return res.status(400).send({
      message: `Missing required field: rol`,
    });
  }
  let emailUser = req.params.email;
  let rol = req.body.rol;
  User.update({ rol: rol }, { where: { email: emailUser } })
    .then((user) => {
      if (user == 1) {
        res.send({ message: "Update successful" });
      } else {
        res.send({ message: `Cannot find User with email ${emailUser}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating user.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + id,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete user with id " + id,
      });
    });
};
