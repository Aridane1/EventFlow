const db = require("../models");
const Event = db.Event;
const fs = require("fs");
const path = require("path");

exports.create = (req, res) => {
  const requiredFields = [
    "name",
    "description",
    "date",
    "price",
    "numTickets",
    "location",
  ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  const newEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    numTickets: req.body.numTickets,
    locationId: req.body.location,
    img: req.file.filename,
  };
  Event.create(newEvent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      });
    });
};

exports.getAll = (req, res) => {
  Event.findAll()
    .then((allEvents) => {
      res.send(allEvents);
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error. Couldn´t find events" });
    });
};

exports.getOne = (req, res) => {
  const id = req.params.id;
  Event.findByPk(id)
    .then((event) => {
      if (!event) {
        return res
          .status(404)
          .json({ message: "No event found with that ID." });
      } else {
        return res.send(event);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Error retrieving event information." });
    });
};

exports.deleteOne = (req, res) => {
  const eventId = req.params.id;

  Event.findOne({ where: { id: eventId } }).then((event) => {
    const eventImg = event.img;
    Event.destroy({
      where: {
        id: eventId,
      },
    })
      .then((result) => {
        if (result === 1) {
          const imagePath = path.join(__dirname, "../public/images", eventImg);
          fs.unlinkSync(imagePath);

          res.send({ message: "Event delete succesfull." });
        } else {
          res.status(404).send({ message: "Event don´t find." });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          message: "Server error. The event could not be deleted",
        });
      });
  });
};

exports.updateOneWithFile = (req, res) => {
  const requiredFields = [
    "name",
    "description",
    "date",
    "price",
    "numTickets",
    "location",
  ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }
  const eventId = req.params.id;

  const updateEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    numTickets: req.body.numTickets,
    locationId: req.body.location,
  };
  console.log("updatePhoto");

  Event.findByPk(eventId)
    .then((event) => {
      let imagePath = path.join(__dirname, "../public/images", event.img);
      fs.unlinkSync(imagePath);
      updateEvent.img = req.file.filename;
      return Event.update(updateEvent, { where: { id: eventId } });
    })
    .then(() => {
      res.send({ message: "Update successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating event.",
      });
    });
};

exports.updateOne = (req, res) => {
  const requiredFields = [
    "name",
    "description",
    "date",
    "price",
    "numTickets",
    "location",
  ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }
  const eventId = req.params.id;
  const updateEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    numTickets: req.body.numTickets,
    locationId: req.body.location,
  };
  console.log("no updatePhoto");

  Event.update(updateEvent, { where: { id: eventId } })
    .then((event) => {
      if (event == 1) {
        res.send({ message: "Update successful" });
      } else {
        res.send({ message: `Cannot find Event with id ${eventId}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating event.",
      });
    });
};
