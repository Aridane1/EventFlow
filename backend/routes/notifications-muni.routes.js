module.exports = (app) => {
  const notifications = require("../controllers/notifications-muni.controller.js");
  const router = require("express").Router();
  router.get("/", notifications.getAllNotification);
  router.post("/", notifications.create);
  router.delete("/:id", notifications.delete);
  router.put("/:id", notifications.update);

  app.use("/api/notifications", router);
};
