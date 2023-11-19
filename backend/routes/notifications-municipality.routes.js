module.exports = (app) => {
  const notifications = require("../controllers/notifications-municipality.controller.js");
  const router = require("express").Router();

  router.post("/send/:id", notifications.sendNotificationForIdLocation);
  router.post(
    "/sendforall",
    notifications.sendNotificationAllUserInAnyLocation
  );

  app.use("/api/notifications", router);
};