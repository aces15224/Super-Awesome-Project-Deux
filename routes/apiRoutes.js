var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {
  // Get all Listings
  app.get("/listings", function(req, res) {
    db.Listings.findAll({}).then(function(dbListings) {
      res.json(dbListings);
    });
  });

// Get all listings with certain amount of bedrooms
  app.get("/listings/bedrooms/:bedrooms?", function(req, res) {
    db.Listings.findAll({
      where:{
        bedrooms:req.params.bedrooms
      }
    }).then(function(dbListings) {
        res.json(dbListings);
      });
    });

// Get all listings within a certain price range
  app.get("/listings/price:price?", function(req, res) {

    console.log(req.query.max)
    db.Listings.findAll({
      where: {
        sellingPrice:{
          [Op.between]: [req.query.min, req.query.max]
        } 
      }
    }).then(function(dbListings) {
      console.log(dbListings)
      res.json(dbListings);
    });
  });


// Get all Zipcodes within a certain range AND within the NKC area 

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
