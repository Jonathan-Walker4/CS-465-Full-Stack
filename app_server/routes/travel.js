const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

console.log(travelController);
// Route for the travel page
router.get('/', travelController.getTrips);

module.exports = router;
