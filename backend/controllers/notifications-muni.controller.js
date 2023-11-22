const db = require("../models");
const NotificationMuni = db.NotificationMuni;

exports.create = (req, res) => {
  let notificationMuni = {
    title: req.body.title,
    message: req.body.message,
  };

  NotificationMuni.create(notificationMuni)
    .then((data) => {
      if (!data) {
        return res.send("Error while creating the notification");
      }
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: err,
      });
    });
};

exports.getAllNotification = (req, res) => {
  NotificationMuni.findAll()
    .then((data) => {
      if (!data) {
        return res.send("No Data Found");
      }
      return res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err });
    });
};

exports.delete = (req, res) => {
  let id = req.params.id;
  NotificationMuni.destroy({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

exports.update = (req, res) => {
  let id = req.params.id;
  NotificationMuni.update(req.body, { where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        error: "Unable to update the information",
      });
    });
};
