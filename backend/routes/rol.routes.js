module.exports = (app) => {
  const rol = require("../controllers/rol.controller.js");
  var router = require("express").Router();

  router.post("/", rol.create);
  router.get("/", rol.getAll);

  app.use("/api/rols", router);
};
