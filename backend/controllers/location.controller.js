const db = require("../models");
const Location = db.Location;
const Event = db.Event;
const fs = require("fs");
const path = require("path");

exports.create = (req, res) => {
  console.log(req.body.name);
  const newLocation = {
    name: req.body.name,
    location_img: req.file.filename,
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

exports.getAllEventsInLocation = (req, res) => {
  let id = req.params.id;
  console.log(id);
  Location.findAll({
    where: {
      id: id,
    },
    include: {
      model: Event,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `No data found with id ${id}`,
        });
      }
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
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
exports.getOne = (req, res) => {
  Location.findByPk(req.params.id)
    .then((location) => {
      if (!location) {
        return res.status(404).send({
          message: "No locations found",
        });
      }
      res.send(location);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Error retrieving locations.",
      });
    });
};

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

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const updateLocation = {
    name: req.body.name,
  };
  Location.update(updateLocation, { where: { id: req.params.id } })
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

exports.updateImage = (req, res) => {
  let locationId = req.params.id;
  let updateLocation = {
    name: req.body.name,
  };
  console.log(locationId);

  Location.findByPk(locationId)
    .then((data) => {
      let imagePath = path.join(
        __dirname,
        "../public/images",
        data.location_img
      );
      fs.unlinkSync(imagePath);
      updateLocation.location_img = req.file.filename;
      return Location.update(updateLocation, { where: { id: locationId } });
    })
    .then(() => {
      res.send({ message: "Update successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating location.",
      });
    });
};
