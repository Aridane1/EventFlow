const db = require("../models");
const Device = db.Device;

exports.create = (req, res) => {
  const requiredFields = ["subscription", "userId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }
  let subscription = {
    endpoint: req.body.subscription.endpoint,
    keys: JSON.stringify(req.body.subscription.keys),
    userId: req.body.userId,
  };

  Device.findOne({
    where: {
      endpoint: req.body.subscription.endpoint,
      userId: req.body.userId,
    },
  })
    .then((data) => {
      if (data) {
        return res.send(data);
      }
      Device.create(subscription)
        .then((data) => {
          if (!data) {
            return res
              .status(400)
              .send({ message: "Error while creating the device" });
          }
          return res.send(subscription);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the device.",
          });
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getAllDeviceUser = (req, res) => {
  let userId = req.params.id;
  Device.findAll({ where: { userId: userId } })
    .then((device) => {
      if (!device) {
        return res.status(404).send({
          message: "No Devices found with that User Id!",
        });
      }
      return res.send(device);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving devices.",
      });
    });
};

exports.deleteByEndpoint = (req, res) => {
  Device.findOne({ where: { endpoint: req.body.endpoint } }).then(
    (deviceToDelete) => {
      if (!deviceToDelete) {
        res.send("endpoint not found");
        return;
      }
      Device.destroy({
        where: {
          id: deviceToDelete.id,
        },
      })
        .then((data) => {
          if (!data) {
            res.send("error deleting");
            return;
          }
          res.send(`deleted ${data} devices`);
        })
        .catch((err) => {
          console.log(err);
          res.send("error deleting");
        });
    }
  );
};

exports.update = (req, res) => {
  const requiredFields = ["subscription", "userId"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send({
        message: `Missing required field: ${field}`,
      });
    }
  }
  const id = req.params.id;
  const data = req.body;
  Device.update(data, { where: { id: id } })
    .then(() => {
      res.json(data);
    })
    .catch((err) => res.send(err));
};
