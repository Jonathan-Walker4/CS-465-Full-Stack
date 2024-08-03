const mongoose = require('mongoose');
const readLine = require('readline');

// Define the host and database URI
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Function to connect to the database with a timeout of 1 second
const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI, {
      // Additional options can be added here
    });
  }, 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows specific listener for SIGINT
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Configure graceful shutdown
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Event Listeners to process graceful shutdowns
// Shutdown invoked by nodemon signal
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Shutdown invoked by app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// Shutdown invoked by container termination
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown', () => {
    process.exit(0);
  });
});

// Make initial connection to the DB
connect();

// Import Mongoose schema
require('./travlr');

module.exports = mongoose;
