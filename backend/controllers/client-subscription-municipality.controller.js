const db = require("../models");
const ClientSubscriptionMunicipality = db.ClientSubscriptionMunicipality;

exports.create = (req, res) => {
  const requiredFields = ["locationId", "userId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }

  const newClientSubMunicipality = {
    userId: req.body.userId,
    locationId: req.body.locationId,
  };
  ClientSubscriptionMunicipality.create(newClientSubMunicipality)
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "Error while creating the subscription" });
      }
      return res.json(data);
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ message: "There was an error in the server", err });
    });
};

exports.findAllByClientId = (req, res) => {
  let id = req.params.id;
  ClientSubscriptionMunicipality.findAll({
    attributes: ["locationId"],
    where: { userId: id },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: `No subscriptions found for this client` });
      }
      const subscriptionIds = data.map(
        (subscription) => subscription.locationId
      );

      return res.json(subscriptionIds);
    })
    .catch((err) => {
      console.log("error", err);
      return res
        .status(500)
        .send({ message: "There was a problem finding the data" });
    });
};

exports.findAll = (req, res) => {
  ClientSubscriptionMunicipality.findAll()
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: `No subscriptions found for this client` });
      }
      return res.json(data);
    })
    .catch((err) => {
      console.log("error", err);
      return res
        .status(500)
        .send({ message: "There was a problem finding the data" });
    });
};

exports.update = (req, res) => {
  const requiredFields = ["locationId", "userId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }
  let id = req.params.id;
  let updateData = req.body;
  ClientSubscriptionMunicipality.update(updateData, { where: { userId: id } })
    .then(() => {
      return res.status(200).send({ message: "Updated Successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Failed to Update Data!", err });
    });
};

exports.delete = (req, res) => {
  let userId = req.params.userId;
  let locationId = req.params.locationId;
  ClientSubscriptionMunicipality.destroy({
    where: { userId: userId, locationId: locationId },
  })
    .then((num) => {
      if (num == 1) {
        return res.status(200).send({ message: "Deleted successfully!" });
      }
      return res.json("No subscription found with that ID!");
    })
    .catch((err) => {
      return res.status(500).send({ message: "Failed to delete data!", err });
    });
};
