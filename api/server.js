require("dotenv").config();
var port = process.env.PORT;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./server/routes");
const db = require("./server/src/models");
const expressApp = express();

var corsOptions = {
  origin: 'https://wkgetaway.herokuapp.com',
  optionsSuccessStatus: 200
}

// database connection authentication
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

// sequelize sync
// force: drop table first if exist and create new table
// alter: check current states of changes of tables in database
db.sequelize.sync({ force: false, alter: false }).then(() => {
  console.log("Models synced...");
});

expressApp.use(cors(corsOptions));
expressApp.use(cookieParser());
expressApp.use(bodyParser.json({ limit: "50mb" })); // increase POST json upto 50mb
expressApp.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

// Routes
expressApp.use("/", routes);

expressApp.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, expressApp.settings.env);
});
module.exports = expressApp;
