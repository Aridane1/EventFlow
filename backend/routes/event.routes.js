module.exports = (app) => {
  const events = require("../controllers/event.controller.js");
  var upload = require("../multer/upload.js");
  var router = require("express").Router();

  router.post("/", upload.single("file"), events.create);
  router.get("/", events.getAll);
  router.delete("/:id", events.deleteOne);
  router.put("/:id", events.updateOne);

  app.use("/api/events", router);
};
