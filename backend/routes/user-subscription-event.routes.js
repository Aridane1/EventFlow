module.exports = (app) => {
  const userSubscriptionEvent = require("../controllers/user-subscription-event.controller");
  const router = require("express").Router();
  router.get(
    "/event-ids/:userId",
    userSubscriptionEvent.getAllSubscriptionEventIdForUser
  );
  router.get("/:userId", userSubscriptionEvent.getAllSubscriptionUser);
  router.post("/", userSubscriptionEvent.create);
  router.delete(
    "/:userId/:eventId",
    userSubscriptionEvent.deleteSubscriptionUserEvent
  );
  router.put("/:userId/:eventId", userSubscriptionEvent.update);

  app.use("/api/user-subscription-event", router);
};
