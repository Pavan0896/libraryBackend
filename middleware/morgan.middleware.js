const path = require("path");
const morgan = require("morgan");
const fs = require("fs");

const logPath = path.join(__dirname, "access.log");

const middleware = (req, res, next) => {
  req._startTime = Date.now();
  next();
  morgan.token("date", () => new Date().toISOString());
  morgan.token("http-version", (req) => req.httpVersion);
  morgan.token("time-taken", (req, res) => {
    return Date.now() - req._startTime + "ms";
  });
};

const logFormat =
  ":method :status :res[content-length] - :time-taken :date HTTP/:http-version :url\n";
const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });

module.exports = { middleware, logFormat, accessLogStream };
