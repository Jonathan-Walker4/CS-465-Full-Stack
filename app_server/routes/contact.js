const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/contact.json', 'utf8'));
    res.render('contact', { title: 'Contact', contact: data.contact });
});

module.exports = router;
