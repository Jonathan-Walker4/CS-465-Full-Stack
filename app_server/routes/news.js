const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
    res.render('news', { title: 'News', news: data });
});

module.exports = router;
