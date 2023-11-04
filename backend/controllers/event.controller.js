const db = require("../models");
const Event = db.Event;

exports.create = (req, res) => {
  const newEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    price: req.body.price,
    numTickets: req.body.numTickets,
    locationId: req.body.location,
    img: req.file.filename,
  };
  console.log(newEvent);
  // Save event in the database
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

exports.deleteOne = (req, res) => {
  const eventId = req.params.id;
  Event.destroy({
    where: {
      id: eventId,
    },
  })
    .then((result) => {
      if (result === 1) {
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
};

exports.updateOne = (req, res) => {
  const eventId = req.params.id;
  const updateEvent = req.body;

  Event.findOne({ where: { id: eventId } })
    .then((event) => {
      if (!event) {
        return res.status(404).send({ message: "Event not find" });
      }
      event.update(updateEvent);
      return res.send(updateEvent);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Server error. The event could not be updated.",
      });
    });
};
