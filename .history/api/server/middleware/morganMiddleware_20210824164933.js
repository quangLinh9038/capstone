const morgan = require("morgan");
const chalk = require("chalk");

const morganMiddleware = morgan(function (tokens, req, res) {
  var method = tokens.method(req, res);
  var status = tokens.status(req, res);

  var methodOptions = {
    GET: "#34ace0",
    POST: "#FFB266",
    DELETE: "#FF3333",
    PUT: "#48D1CC",
  };


  function methodColor = 
  // var methodColor =
  //   method === "GET"
  //     ? "#34ace0" // blue
  //     : method == "POST"
  //     ? "FFB266" // orange
  //     : method == "POST";
  return [
    chalk.hex(methodColor).bold(method),
    chalk.hex("#00CC66").bold(status),
    chalk.hex("#ff5252").bold(tokens.url(req, res)),
    chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#f78fb3").bold("@ " + tokens.date(req, res)),
    chalk.yellow(tokens["remote-addr"](req, res)),
    chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
    chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
    "\n",
  ].join(" ");
});

module.exports = morganMiddleware;
