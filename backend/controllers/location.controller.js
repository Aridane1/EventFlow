const db = require("../models");
const Location = db.Location;

exports.create = (req, res) => {
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
exports.update = (req, res) => {};
