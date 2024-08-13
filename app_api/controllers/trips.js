// app_api/controllers/trips.js

const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// List all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching trips.' });
  }
};

// Add a new trip
const tripsAddTrip = async (req, res) => {
  try {
    // Parse the date before saving if necessary
    if (req.body.start) {
      req.body.start = new Date(req.body.start);
    }

    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });

    const q = await newTrip.save();

    if (!q) {
      return res.status(400).json({ error: 'Database returned no data' });
    } else {
      return res.status(201).json(q);
    }

    // Uncomment the following line to show results of operation on the console
    // console.log(q);
  } catch (err) {
    console.error('Error adding trip:', err);
    res.status(500).json({ error: 'An error occurred while adding the trip.' });
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);

    // Optionally check if req.body is a plain object
    if (typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Invalid request body format' });
    }

    const q = await Trip.findOneAndUpdate(
      { 'code': req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true } // This option returns the updated document
    ).exec();

    if (!q) {
      // Database returned no data
      return res.status(400).json({ error: 'No matching trip found to update.' });
    } else {
      // Return resulting updated trip
      return res.status(201).json(q);
    }

    // Uncomment the following line to show results of the operation on the console
    // console.log(q);
  } catch (err) {
    console.error('Error updating trip:', err);
    res.status(500).json({ error: 'An error occurred while updating the trip.' });
  }
};


// Find a trip by code
const tripByCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;
    const trip = await Trip.findOne({ code: tripCode });
    if (!trip) {
      res.status(404).json({ message: 'Trip not found.' });
    } else {
      res.status(200).json(trip);
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the trip.' });
  }
};

module.exports = {
  tripsList,
  tripsAddTrip,
  tripsUpdateTrip,
  tripByCode,
};
