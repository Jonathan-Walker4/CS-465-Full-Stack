const fs = require('fs');
const path = require('path');

const roomsIndex = (req, res) => {
    const roomsFilePath = path.join(__dirname, '..', '..', 'data', 'rooms.json');
    const rooms = JSON.parse(fs.readFileSync(roomsFilePath, 'utf8'));

    res.render('rooms', { 
        title: "Rooms - Travlr Getaways",
        currentRoute: '/rooms',
        rooms
    });
};

module.exports = {
    roomsIndex
};
