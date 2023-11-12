module.exports = (app) => {
  const User = require("../controllers/user.controller");
  const router = require("express").Router();
  const auth = require("../controllers/auth.js");

  router.post("/", User.create);
  router.get("/", auth.isAuthenticated, User.getAll);
  router.get("/token", auth.isAuthenticated, User.userByToken);
  router.post("/signin", auth.signin);

  app.use("/api/users", router);
};
