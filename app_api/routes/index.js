const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');  // Ensure the correct path
const authController = require('../controllers/authentication');  // Ensure the correct path

// Define route for login
router.route('/login')
  .post(authController.login);

// Define route for registration
router.route('/register')
  .post(authController.register);

// Define route for our trips endpoint with authentication
router.route('/trips')
  .get(tripsController.tripsList)  // Public route for listing trips
  .post(authController.authenticateJWT, tripsController.tripsAddTrip);  // Protected route for adding a trip

// Define route for a specific trip by code with authentication
router.route('/trips/:tripCode')
  .get(tripsController.tripByCode)  // Public route for retrieving a trip by code
  .put(authController.authenticateJWT, tripsController.tripsUpdateTrip);  // Protected route for updating a trip

module.exports = router;
