// app_api/controllers/trips.js

const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// Controller method to get a list of all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find(); // Fetch all trips from the database
    res.status(200).json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ error: 'An error occurred while fetching trips.' });
  }
};

// Controller method to get details of a specific trip by code
const tripByCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode; // Get the trip code from the URL parameter
    const trip = await Trip.findOne({ code: tripCode }); // Find the trip with the given code

    if (!trip) {
      res.status(404).json({ message: 'Trip not found.' });
    } else {
      res.status(200).json(trip);
    }
  } catch (err) {
    console.error('Error fetching trip:', err);
    res.status(500).json({ error: 'An error occurred while fetching the trip.' });
  }
};

module.exports = {
  tripsList,
  tripByCode,
};
