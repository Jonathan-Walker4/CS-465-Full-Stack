// app_server/controllers/travel.js
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.render('travel', { title: 'Travlr Getaways - Travel', trips });
    } catch (err) {
        console.error('Error fetching trips:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getTrips
};
