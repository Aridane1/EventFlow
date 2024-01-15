module.exports = (app) => {
  const location = require("../controllers/location.controller.js");
  var upload = require("../multer/upload.js");

  var router = require("express").Router();

  router.post("/", upload.single("file"), location.create);
  router.get("/count-localizaciones", location.countEventsOfLocation);
  router.get("/events-locations/:id", location.getAllEventsInLocation);
  router.get("/", location.getAll);
  router.get("/:id", location.getOne);
  router.put("/image/:id", upload.single("file"), location.updateImage);
  router.put("/:id", location.update);
  router.delete("/:id", location.delete);

  app.use("/api/locations", router);
};
