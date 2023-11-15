module.exports = (app) => {
  const clientSubscriptionMunicipality = require("../controllers/client-subscription-municipality.controller");
  var router = require("express").Router();

  router.post("/", clientSubscriptionMunicipality.create);
  router.get("/:id", clientSubscriptionMunicipality.findAllByClientId);
  router.get("/", clientSubscriptionMunicipality.findAll);
  router.delete("/:userId/:locationId", clientSubscriptionMunicipality.delete);
  router.put("/:id", clientSubscriptionMunicipality.update);

  app.use("/api/client-subscription-municipality", router);
};
