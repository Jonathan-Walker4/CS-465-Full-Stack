// app_server/controllers/travel.js

const fetch = require('node-fetch');

const travel = async (req, res) => {
  const tripsEndpoint = 'http://localhost:3000/api/trips';
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(tripsEndpoint, options);
    if (!response.ok) {
      throw new Error('Failed to fetch trips');
    }
    const trips = await response.json();

    // Additional error handling for data validation
    if (!Array.isArray(trips) || trips.length === 0) {
      throw new Error('No trips found');
    }

    res.render('travel', { title: 'Travlr Getaways', trips });
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).render('error', { error: 'Unable to fetch trips at this time.' });
  }
};

module.exports = {
  travel
};
