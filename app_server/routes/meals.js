const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));
    res.render('meals', { title: 'Meals', meals: data.meals });
});

module.exports = router;
