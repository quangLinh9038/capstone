const morgan = require("morgan");
const chalk = require("chalk");

var methodOptions = {
  GET: "#34ace0", // blue
  POST: "#FFB266", // orange
  DELETE: "#FF3333", // red
  PUT: "#48D1CC", // dark turquoise	
};
var statusOptions = {
  200: "#00FF00", //lime,
  300: "#00FFFF", // cyan
  400: "#FFFF00", // yellow
  500: ""
}

getMethodColor = (methodOptions, method) => {
  return methodOptions[method];
};

getStatusColor = ()
const morganMiddleware = morgan(function (tokens, req, res) {
  var method = tokens.method(req, res);
  var status = tokens.status(req, res);
  console.log(
    "🚀 ~ file: morganMiddleware.js ~ line 19 ~ morganMiddleware ~ status",
    status
  );

  const methodColor = getMethodColor(methodOptions, method);

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
