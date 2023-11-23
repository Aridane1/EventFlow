module.exports = (app) => {
  const notificationEvent = require("../controllers/notification-event.controller.js");

  var router = require("express").Router();

  router.get("/", notificationEvent.getAllNotification);
  router.post("/", notificationEvent.create);
  router.delete("/:id", notificationEvent.delete);
  router.put("/:id", notificationEvent.update);

  app.use("/api/notification-event", router);
};
