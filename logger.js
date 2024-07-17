const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'app.log');

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const logRequest = (req, res, next) => {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  logStream.write(logMessage);
  next();
};

const logError = (err, req, res, next) => {
  const errorMessage = `[${new Date().toISOString()}] Error: ${err.message}\n`;
  logStream.write(errorMessage);
  next(err);
};

module.exports = {
  logRequest,
  logError
};
