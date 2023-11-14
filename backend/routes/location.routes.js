module.exports = (app) => {
  const location = require("../controllers/location.controller.js");
  var upload = require("../multer/upload.js");

  var router = require("express").Router();

  router.post("/", upload.single("file"), location.create);
  router.get("/", location.getAll);
  router.put("/:id", location.update);
  router.put("/image/:id", upload.single("file"), location.updateImage);
  router.delete("/:id", location.delete);

  app.use("/api/locations", router);
};
