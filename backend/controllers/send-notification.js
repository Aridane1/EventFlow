const webpush = require("web-push");
const db = require("../models");
const ClientSubscriptionMunicipality = db.ClientSubscriptionMunicipality;
const NotificationMuni = db.NotificationMuni;
const User = db.User;
const Device = db.Device;
const Op = db.Sequelize.Op;

exports.sendNotificationForIdLocation = async (notificationMunicipality) => {
  try {
    const subscriptions = await ClientSubscriptionMunicipality.findAll({
      where: { locationId: notificationMunicipality.locationId },
      include: [{ model: User, include: [Device] }],
    });

    const message = await NotificationMuni.findOne({
      where: { id: notificationMunicipality.notificationId },
    });

    const devices = [];

    for (const subscription of subscriptions) {
      const userDevices = subscription.user.get("devices");
      if (userDevices && userDevices.length > 0) {
        devices.push(...userDevices.map((device) => device.dataValues));
      }
    }
    for (const device of devices) {
      sendNotificationToSubscription(device, message.dataValues);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.sendNotificationAllUserInAnyLocation = async (
  notificationId,
  locationIds
) => {
  try {
    let locationArrayId = [];
    for (const iterator of locationIds) {
      locationArrayId.push(iterator.id);
    }

    const subscriptions = await ClientSubscriptionMunicipality.findAll({
      where: { locationId: { [Op.in]: locationArrayId } },
      include: [{ model: User, include: [Device] }],
    });

    const message = await NotificationMuni.findOne({
      where: { id: notificationId },
    });

    console.log(subscriptions);
    const devices = [];

    for (const subscription of subscriptions) {
      const userDevices = subscription.user.get("devices");
      if (userDevices && userDevices.length > 0) {
        devices.push(...userDevices.map((device) => device.dataValues));
      }
    }
    for (const device of devices) {
      sendNotificationToSubscription(device, message.dataValues);
    }
  } catch (err) {
    console.error(err);
  }
};

async function sendNotificationToSubscription(subscription, message) {
  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: JSON.parse(subscription.keys),
  };
  const payload = {
    notification: {
      title: message.title,
      body: message.message,
      vibrate: [50, 50, 50],
      image:
        "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
      actions: [
        {
          action: "explore",
          title: "Go to the site",
        },
      ],
    },
  };
  await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
}
