module.exports = (app) => {
  const UserRol = require("../controllers/user-rol.controller.js");
  const router = require("express").Router();

  router.post("/", UserRol.create);
  router.get("/", UserRol.getAll);
  router.get("/:id", UserRol.getOneUserRol);
  router.delete("/:userId/:rolId", UserRol.delete);

  app.use("/api/user-rols", router);
};
