require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

var path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

var corsOptions = {
  origin: "*",
};

// database conection
const db = require("./models");

// For explotation. Database is not dropped.
db.sequelize.sync();
// db.sequelize
//   .sync({ force: true })
//   .then(() => console.log("Drop and Resync with { force: true }"));

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/event.routes")(app);
require("./routes/location.routes")(app);

app.listen(PORT, () => {
  console.log("Server started on: " + PORT);
});
