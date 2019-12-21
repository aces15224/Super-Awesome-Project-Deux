var db = require("../models");
// var bedrooms = require("../public/js/app.js")

module.exports = function(app) {
  // Get all Listings
  app.get("/listings", function(req, res) {
    db.Listings.findAll({}).then(function(dbListings) {
      res.json(dbListings);
    });
  });

  app.get("/listings/bedrooms/:bedrooms?", function(req, res) {
    db.Listings.findAll({
      where:{
        bedrooms:req.params.bedrooms
      }
    }).then(function(dbListings) {
        res.json(dbListings);
      });
    });


  // app.get("/listings/:price?", function(req, res) {
  //   db.Listings.findAll({
  //     where: {
  //       sellingPrice:{
  //         $between: [50000, 200000]
  //       } 
  //     }
  //   }).then(function(dbListings) {
  //     console.log(dbListings)
  //     res.json(dbListings);
  //   });
  // });


// get all zipcodes 

  // app.get("/listings/zipcode", function(req, res) {
  //   db.Listings.findAll({
  //     include:[{
  //       model:Listings,
  //       as
  //     }]
  //   }).then(function(dbListings) {
  //     res.json(dbListings);
  //   });
  // });

  // Create a new Listings
  app.post("/listings", function(req, res) {
    db.Listings.create(req.body).then(function(dbListings) {
      res.json(dbListings);
    });
  });

  // Delete an Listings by id
  app.delete("/listings:id", function(req, res) {
    db.Listings.destroy({ where: { id: req.params.id } }).then(function(dbListings) {
      res.json(dbListings);
    });
  });
};
