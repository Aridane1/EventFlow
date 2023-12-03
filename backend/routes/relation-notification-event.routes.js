module.exports = (app) => {
  const notifications = require("../controllers/relation-notification-event.controller.js");
  const router = require("express").Router();
  router.get("/", notifications.getNotificationByEvent);
  router.post("/", notifications.create);
  router.delete(
    "/:eventId/:notificationId",
    notifications.deleteNotificationEvent
  );
  router.put(
    "/:eventId/:notificationId",
    notifications.updateNotificationLocation
  );

  app.use("/api/relation-notification-event", router);
};
