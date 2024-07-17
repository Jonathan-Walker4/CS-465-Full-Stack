const travelIndex = (req, res) => {
    console.log('Travel controller accessed');
    res.render('travel', { title: "Travlr Getaways" });
  };
  
  module.exports = {
    travelIndex
  };
  