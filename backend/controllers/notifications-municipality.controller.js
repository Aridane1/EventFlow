const webpush = require("web-push");
const db = require("../models");
const NotificationMunicipality = db.NotificationMunicipality;
const ClientSubscriptionMunicipality = db.ClientSubscriptionMunicipality;

exports.sendNotificationForIdLocation = (req, res) => {
  let message = {
    title: req.body.title,
    message: req.body.message,
    locationIds: [req.params.id],
  };
  console.log(message);
  ClientSubscriptionMunicipality.findAll({
    where: { locationId: req.params.id },
  })
    .then((subscriptions) => {
      const notificationPromises = subscriptions.map((subscription) =>
        sendNotificationToSubscription(subscription, message)
      );
      NotificationMunicipality.create(message)
        .then(() => {})
        .catch((err) => {
          console.log("no se pudo guardar la notifiacion");
        });
      return Promise.all(notificationPromises);
    })
    .then((responses) => {
      console.log("Notificaciones enviadas con éxito:", responses);
      res.send({
        data: "Se enviaron las notificaciones a todas las suscripciones.",
      });
    })
    .catch((error) => {
      console.error("Error al enviar notificaciones:", error);
      res.status(500).send({ error: "Error al enviar notificaciones." });
    });
};

exports.getNotificationByLocation = (req, res) => {
  NotificationMunicipality.findAll({ where: { locationIds: req.params.id } })
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

exports.sendNotificationAllUserInAnyLocation = (req, res) => {
  let message = {
    title: req.body.title,
    message: req.body.message,
    locationIds: [],
  };

  ClientSubscriptionMunicipality.findAll()
    .then((subscriptions) => {
      const uniqueLocationIds = new Set(
        subscriptions.map((subscription) => subscription.locationId)
      );
      message.locationIds = Array.from(uniqueLocationIds);
      const notificationPromises = subscriptions.map((subscription) =>
        sendNotificationToSubscription(subscription, message)
      );
      console.log(message);
      NotificationMunicipality.create(message)
        .then(() => {})
        .catch((err) => {
          console.log("no se pudo guardar la notifiacion");
        });

      return Promise.all(notificationPromises);
    })
    .then((responses) => {
      console.log("Notificaciones enviadas con éxito:", responses);
      res.send({
        data: "Se enviaron las notificaciones a todas las suscripciones.",
      });
    })
    .catch((error) => {
      console.error("Error al enviar notificaciones:", error);
      res.status(500).send({ error: "Error al enviar notificaciones." });
    });
};

function sendNotificationToSubscription(subscription, message) {
  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      auth: subscription.auth,
      p256dh: subscription.p256dh,
    },
  };

  const payload = {
    notification: {
      title: message.title,
      body: message.body,
      vibrate: [50, 50, 50],
      image:
        "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
      actions: [
        {
          action: "explore",
          title: "Go to the site",
        },
      ],
    },
  };
  return webpush.sendNotification(pushSubscription, JSON.stringify(payload));
}
