const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Get the current working directory
const logDirectory = path.join(process.cwd(), 'logs');

// Ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'app.log'), { flags: 'a' });

// Setup the logger
const logRequest = morgan('combined', { stream: accessLogStream });

const logError = (err, req, res, next) => {
    fs.appendFile(path.join(logDirectory, 'error.log'), `${new Date().toISOString()} - ${err.message}\n`, (err) => {
        if (err) throw err;
    });
    next(err);
};

module.exports = { logRequest, logError };
