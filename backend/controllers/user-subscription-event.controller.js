const db = require("../models");
const UserSubscriptionEvent = db.UserSubscriptionEvent;
const Event = db.Event;

exports.create = (req, res) => {
  let newUserSubscriptionEvent = {
    userId: req.body.userId,
    eventId: req.body.eventId,
  };

  UserSubscriptionEvent.create(newUserSubscriptionEvent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the subscription.",
      });
    });
};

exports.getAllSubscriptionUser = (req, res) => {
  UserSubscriptionEvent.findAll({
    where: { userId: req.params.userId },
    include: {
      model: Event,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "No subscription found with that userId",
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscription.",
      });
    });
};

exports.deleteSubscriptionUserEvent = (req, res) => {
  UserSubscriptionEvent.destroy({
    where: {
      userId: req.params.userId,
      eventId: req.params.eventId,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Subscription was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Subscription with id=${req.params.userId}. Maybe
                            Subscription was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Subscription with id=" + req.params.userId,
      });
    });
};

exports.update = (req, res) => {
  console.log(req.body);
  console.log(req.params);
  UserSubscriptionEvent.update(req.body, {
    where: {
      userId: req.params.userId,
      eventId: req.params.eventId,
    },
  })
    .then((data) => {
      if (data) {
        res.send({
          message: "Subscription was updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update Subscription with id=${req.params.userId}. Maybe Subscription was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Subscription with id=" + req.params.userId,
      });
    });
};
