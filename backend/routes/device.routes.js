module.exports = (app) => {
  const device = require("../controllers/device.controller");
  const router = require("express").Router();
  router.get("/:id", device.getAllDeviceUser);
  router.post("/", device.create);
  router.put("/:id", device.update);
  router.delete("/", device.deleteByEndpoint);

  app.use("/api/devices", router);
};
