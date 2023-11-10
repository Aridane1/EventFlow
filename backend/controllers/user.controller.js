const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const utils = require("../utils");

exports.create = (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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