const fs = require('fs');
const path = require('path');

const newsIndex = (req, res) => {
    const newsFilePath = path.join(__dirname, '..', '..', 'data', 'news.json');
    const news = JSON.parse(fs.readFileSync(newsFilePath, 'utf8'));

    res.render('news', { 
        title: "News - Travlr Getaways",
        currentRoute: '/news',
        news
    });
};

module.exports = {
    newsIndex
};
