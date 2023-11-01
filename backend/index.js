require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8000;

var corsOptions = {
  origin: "*",
};

// database conection
const db = require("./models");

// For explotation. Database is not dropped.
db.sequelize.sync();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/event.route")(app);

app.listen(PORT, () => {
  console.log("Server started on: " + PORT);
});
