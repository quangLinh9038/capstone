require("dotenv").config();
var port = process.env.PORT;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morganMiddleware = require("./server/middleware/morganMiddleware");

const routes = require("./server/routes");
const db = require("./server/src/models");
const app = express();

var corsOptions = {
  origin: ["https://wkgetaway.herokuapp.com", "http://localhost:3000"],
  optionsSuccessStatus: 200,
  credentials: true,
};

/* 
  Postgres database connection authentication 
*/
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

/* 
Sequelize table sync
* force: drop table first if exist and create new table
* alter: check current states of changes of tables in database
*/
db.sequelize.sync({ force: false, alter: false }).then(() => {
  console.log("Models synced...");
});

/* 
  Using packages
*/
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" })); // * Increase limitation of upload file
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(morganMiddleware); // * Logger middleware

/* 
  Using routes
*/
app.use("/", routes);

app.listen(port, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
module.exports = app;
