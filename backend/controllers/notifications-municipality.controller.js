const db = require("../models");
const NotificationMunicipality = db.NotificationMunicipality;
const NotificationMuni = db.NotificationMuni;
const Location = db.Location;
const sendNotification = require("./send-notification");

exports.createOneNotificationMunicipality = (req, res) => {
  const requiredFields = ["notificationId", "locationId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  let locationId = req.body.locationId;
  let notificationId = req.body.notificationId;

  let notificationMunicipality = {
    locationId: locationId,
    notificationId: notificationId,
  };
  NotificationMunicipality.create(notificationMunicipality)
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "No se ha podido crear el registro",
        });
      }

      sendNotification.sendNotificationForIdLocation({
        locationId: locationId,
        notificationId: notificationId,
      });
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record.",
      });
    });
};
exports.createManyNotificationMunicipality = async (req, res) => {
  const requiredFields = ["notificationId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  let notificationId = req.body.notificationId;
  const locations = await Location.findAll();
  const notificationMunicipality = locations.map((location) => ({
    locationId: location.id,
    notificationId: notificationId,
  }));

  NotificationMunicipality.bulkCreate(notificationMunicipality)
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "No se ha podido crear el registro",
        });
      }
      sendNotification.sendNotificationAllUserInAnyLocation(
        notificationId,
        locations
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

exports.getNotificationByLocation = (req, res) => {
  NotificationMunicipality.findAll({
    where: { locationId: req.params.id },
    include: { model: NotificationMuni },
  })
    .then((notifications) => {
      if (!notifications) {
        res.json({ data: "No hay notificaciones para este lugar" });
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

exports.deleteNotificationLocation = (req, res) => {
  let notificationId = req.params.notificationId;
  let locationId = req.params.locationId;
  NotificationMunicipality.destroy({
    where: {
      locationId: locationId,
      notificationId: notificationId,
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
  const requiredFields = ["notificationId", "locationId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  let notificationId = req.params.notificationId;
  let locationId = req.params.locationId;
  NotificationMunicipality.update(req.body, {
    where: {
      locationId: locationId,
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
