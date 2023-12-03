module.exports = (app) => {
  const notifications = require("../controllers/notifications-municipality.controller.js");
  const router = require("express").Router();
  router.get("/", notifications.getNotificationByLocation);
  router.post("/", notifications.createOneNotificationMunicipality);
  router.post("/forall", notifications.createManyNotificationMunicipality);
  router.delete(
    "/:notificationId/:locationId",
    notifications.deleteNotificationLocation
  );
  router.put(
    "/:notificationId/:locationId",
    notifications.updateNotificationLocation
  );

  app.use("/api/notifications-municipality", router);
};
