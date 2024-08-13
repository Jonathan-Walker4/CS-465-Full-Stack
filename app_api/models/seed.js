const mongoose = require('mongoose');
const Trip = require('./travlr');
const path = require('path');
const tripsData = require(path.join(__dirname, '../../data/trips.json'));

const dbURI = 'mongodb://127.0.0.1/travlr';
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const seedTrips = async () => {
  try {
    await Trip.deleteMany({});
    console.log('Existing trips removed.');
    await Trip.insertMany(tripsData);
    console.log('Trips seeded successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding trips:', error);
    mongoose.connection.close();
  }
};

seedTrips();
