var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/new", function(req, res) {
    db.Listings.findAll({}).then(function(dbListingss) {
      res.json(dbListingss);
    });
  });

  // Create a new Listings
  app.post("/api/new", function(req, res) {
    db.Listings.create(req.body).then(function(dbListings) {
      res.json(dbListings);
    });
  });

  // Delete an Listings by id
  app.delete("/api/new/:id", function(req, res) {
    db.Listings.destroy({ where: { id: req.params.id } }).then(function(dbListings) {
      res.json(dbListings);
    });
  });
};
