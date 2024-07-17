const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/travel');

router.get('/', (req, res, next) => {
  console.log('Travel router accessed');
  next();
}, (req, res, next) => {
  console.log('Calling travel controller');
  ctrlTravel.travelIndex(req, res, next);
});

module.exports = router;
