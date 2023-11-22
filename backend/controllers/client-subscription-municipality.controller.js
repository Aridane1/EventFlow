const db = require("../models");
const ClientSubscriptionMunicipality = db.ClientSubscriptionMunicipality;

exports.create = (req, res) => {
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
  ClientSubscriptionMunicipality.findAll({ userId: id })
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
    .then(() => {
      return res.status(200).send({ message: "Deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Failed to delete data!", err });
    });
};
