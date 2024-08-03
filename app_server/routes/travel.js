const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

router.get('/', travelController.getTrips);

// New route for trip details
router.get('/:tripCode', travelController.getTripDetails);

module.exports = router;
