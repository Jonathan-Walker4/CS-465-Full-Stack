const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
  .route('/trips')
  .get(tripsController.tripsList) // Ensure tripsList is correctly imported and defined
  .post(tripsController.tripsAddTrip); // Ensure tripsAddTrip is correctly imported and defined

router
  .route('/trips/:tripCode')
  .get(tripsController.tripByCode) // Ensure tripByCode is correctly imported and defined
  .put(tripsController.tripsUpdateTrip);

module.exports = router;
