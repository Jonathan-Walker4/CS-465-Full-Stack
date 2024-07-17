const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));
    res.render('rooms', { title: 'Rooms', rooms: data.rooms });
});

module.exports = router;
