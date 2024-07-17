const fs = require('fs');
const path = require('path');

const mealsIndex = (req, res) => {
    const mealsFilePath = path.join(__dirname, '..', '..', 'data', 'meals.json');
    const meals = JSON.parse(fs.readFileSync(mealsFilePath, 'utf8'));

    res.render('meals', { 
        title: "Meals - Travlr Getaways",
        currentRoute: '/meals',
        meals
    });
};

module.exports = {
    mealsIndex
};
