require("dotenv").config();
const webpush = require("web-push");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const initializeDatabase = require("./initialize");
var path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

var corsOptions = {
  origin: "*",
};

const vapidKeys = {
  publicKey: process.env.PUBLIC_VAPID_KEY,
  privateKey: process.env.PRIVATE_VAPID_KEY,
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const db = require("./models");

db.sequelize.sync().then(initializeDatabase());
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Sync db without dropping.");
//   initializeDatabase();
// });

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  if (req.headers.authorization.indexOf("Basic ") === 0) {
    // verify auth basic credentials

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    //saca la informacion que llegue desde el req.body

    const [email, password] = credentials.split(":");
    req.body.email = email;
    req.body.password = password;

    return next();
  }

  token = token.replace("Bearer ", "");
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});

require("./routes/event.routes")(app);
require("./routes/location.routes")(app);
require("./routes/user.routes")(app);
require("./routes/client-subscription-municipality.routes")(app);
require("./routes/notifications-muni.routes")(app);
require("./routes/notifications-municipality.routes")(app);
require("./routes/device.routes")(app);
require("./routes/user-subscription-event.routes")(app);
require("./routes/notification-event.routes")(app);
require("./routes/relation-notification-event.routes")(app);

app.listen(PORT, () => {
  console.log("Server started on: " + PORT);
});

module.exports = app;
