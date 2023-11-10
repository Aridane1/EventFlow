const db = require("../models");
const Location = db.Location;

exports.create = (req, res) => {
  console.log(req.body.name);
  const newLocation = {
    name: req.body.name,
  };
  Location.create(newLocation)
    .then((createLocation) => {
      res.send({
        message: "New location has been created successfully",
        createLocation,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the location.",
      });
    });
};
exports.getAll = (req, res) => {
  Location.findAll()
    .then((allLocation) => {
      if (!allLocation) {
        return res.status(404).send({
          message: "No locations found",
        });
      }
      res.send(allLocation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Error retrieving locations.",
      });
    });
};

//Delete
exports.delete = (req, res) => {
  const id = req.params.id;
  Location.destroy({ where: { id: id } })
    .then(() => {
      res.send({
        message: `location was deleted successfully!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Could not delete location with this id",
      });
    });
};

//update
exports.update = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Find user and update it with the requested information
  Location.update(req.body, { where: { id: req.params.id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "location was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update location with id=${req.params.id}. Maybe location was not found or req.body is empty!`,
          message: `Cannot update location with id=${id}. Maybe location was not found or req.body is empty!`,
          message: `Cannot update location with id=${id}. Maybe location was not found or does not exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating location with this id",
      });
    });
};
