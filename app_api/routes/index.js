// app_api/routes/index.js

const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Route to get a list of all trips
router.get('/trips', tripsController.tripsList);

// Route to get details of a trip by code
router.get('/trips/:tripCode', tripsController.tripByCode);

module.exports = router;
