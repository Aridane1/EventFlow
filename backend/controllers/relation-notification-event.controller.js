const db = require("../models");
const RelationNotificationEvent = db.RelationNotificationEvent;
const NotificationEvent = db.NotificationEvent;
const sendNotification = require("./send-notification");

exports.create = (req, res) => {
  const requiredFields = ["notificationId", "eventId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  let eventId = req.body.eventId;
  let notificationId = req.body.notificationId;

  let notificationEvent = {
    eventId: eventId,
    notificationId: notificationId,
  };
  RelationNotificationEvent.create(notificationEvent)
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "No se ha podido crear el registro",
        });
      }

      sendNotification.sendNotificationAllUserInAnyEvent(
        notificationId,
        eventId
      );
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record.",
      });
    });
};

exports.getNotificationByEvent = (req, res) => {
  RelationNotificationEvent.findAll({
    where: { eventId: req.params.id },
    include: { model: NotificationEvent },
  })
    .then((notifications) => {
      if (!notifications) {
        res.json({ data: "No hay notificaciones para este evento" });
      } else {
        res.json(notifications);
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: err,
      });
    });
};

exports.deleteNotificationEvent = (req, res) => {
  let notificationId = req.params.notificationId;
  let eventId = req.params.eventId;
  RelationNotificationEvent.destroy({
    where: {
      notificationId: notificationId,
      eventId: eventId,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "No se ha podido eliminar el registro",
        });
      }
      return res.send({ message: "Registro eliminado" });
    })
    .catch((err) => {
      res.status(400).send({
        error: err,
      });
    });
};
exports.updateNotificationLocation = (req, res) => {
  const requiredFields = ["notificationId", "eventId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  let notificationId = req.params.notificationId;
  let eventId = req.params.eventId;
  RelationNotificationEvent.update(req.body, {
    where: {
      eventId: eventId,
      notificationId: notificationId,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "No se ha actualizado el registro",
        });
      }
      return res.send({ message: "Registro Actualizado" });
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
      });
    });
};
