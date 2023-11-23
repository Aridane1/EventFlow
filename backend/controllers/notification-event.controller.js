const db = require("../models");
const NotificationEvent = db.NotificationEvent;

exports.create = (req, res) => {
  let newNotificationEvent = {
    title: req.body.title,
    message: req.body.message,
  };
  NotificationEvent.create(newNotificationEvent)
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "NotificationEvent cannot be created!",
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the NotificationEvent.",
      });
    });
};

exports.getAllNotification = (req, res) => {
  NotificationEvent.findAll()
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
  const id = req.params.id;
  NotificationEvent.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "NotificationEvent was deleted successfully!",
        });
        return;
      }
      return res.send({
        message: `Cannot delete NotificationEvent with id=${id}. Maybe NotificationEvent was not found!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while deleting the NotificationEvent.",
      });
    });
};

exports.update = (req, res) => {
  let id = req.params.id;
  NotificationEvent.update(req.body, { where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        error: "Unable to update the information",
      });
    });
};
