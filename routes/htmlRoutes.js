var db = require("../models");

module.exports = function(app) {

// Buy Page Route

app.get("/buy", function(req, res) {
  res.render("buyer")
})

// Sell Page Route
app.get("/sell", function(req, res) {
  res.render("seller")
})

// Load About page
app.get("/about", function(req, res) {
  res.render("about")    
});

// Load index page
app.get("/", function(req, res) {
  res.render("index")    
});

  // Render 404 page for any unmatched routes
app.get("*", function(req, res) {
  res.render("404");
});
};
