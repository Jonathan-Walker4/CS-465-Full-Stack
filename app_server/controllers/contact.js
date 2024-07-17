const contact = (req, res) => {
    res.render('contact', { 
        title: "Contact - Travlr Getaways",
        currentRoute: '/contact'
    });
};

module.exports = {
    contact
};
