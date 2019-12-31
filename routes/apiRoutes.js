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

  // Listings with a certain ID

  app.get("/listings/listings:id?", function(req, res) {

    console.log(req.query.max)
    db.Listings.findAll({
      where: { 
        id: req.params.id 
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


function createDetailPage(listings) {
  // var formattedDate = new Date(listings.createdAt);
  // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
  var newlistingsCard = $("<div>");
  newlistingsCard.addClass("card");
  var newlistingsCardHeading = $("<div>");
  newlistingsCardHeading.addClass("card-header");
  // var deleteBtn = $("<button>");
  // deleteBtn.text("x");
  // deleteBtn.addClass("delete btn btn-danger");
  // var editBtn = $("<button>");
  // editBtn.text("EDIT");
  // editBtn.addClass("edit btn btn-info");
  var newlistingsTitle = $("<h5>");

  //image//----------------------------------------------------
  var listingImage = $("<img>");
  listingImage.addClass("listing-image");
  listingImage.attr('src', listings.image);
  listingImage.attr('id', listings.id);
  listingImage.css({
    float: "left"
  });
  //image//--------------------------------------------------------

  // var newlistingsDate = $("<small>");
  var newlistingsAuthor = $("<h7>");
  // edit
  newlistingsAuthor.text("Lister: " + listings.sellerName);
  // edit
  newlistingsAuthor.css({
    float: "right",
    color: "blue"
  });
  var newlistingsCardBody = $("<div>");
  newlistingsCardBody.addClass("card-body");


  //results list//
  var resultList = $("<ul>");
  var listItem = $("<li>");
  var dataBed = $("<p>");
  var dataEmail = $("<p>");
  var dataSqFt = $("<p>");
  var heatCool = $("<p>");
  var addDetail = $("<p>")

  addDetail.text("Additional Details: " + listings.listingDetails);
  heatCool.text("Heating & Cooling: " + listings.hotAndCold);
  dataSqFt.text("Area: " + listings.sqFootage + " sq. ft.");
  dataBed.text("Bedrooms: " + listings.bedrooms);
  dataEmail.text("Email: " + listings.email);
  listItem.append(dataSqFt);
  listItem.append(dataBed);
  listItem.append(heatCool);
  listItem.append(dataEmail);

  resultList.addClass("result");
  resultList.append(listItem);
  newlistingsCardBody.append(resultList);
  newlistingsCardBody.append(addDetail);

  //results list//

  resultList.css({
    float: "right"
  });
  var newlistingsBody = $("<p>");
  newlistingsBody.css({
    float: "right"
  });
  // edit
  // newlistingsBody.text("Contact email: " + listings.email);
  newlistingsTitle.text("Asking price: $" + listings.sellingPrice);
  // edit
  // newlistingsDate.text(formattedDate);
  // newlistingsTitle.append(newlistingsDate);
  // newlistingsCardHeading.append(deleteBtn);
  // newlistingsCardHeading.append(editBtn);
  newlistingsCardBody.append(newlistingsBody);
  newlistingsCardHeading.append(newlistingsTitle);
  newlistingsCardHeading.append(newlistingsAuthor);
  newlistingsCardHeading.append(newlistingsTitle);
  //image//------------------------------------------------------------
  newlistingsCardBody.append(listingImage);
  //image//------------------------------------------------------------
  newlistingsCard.append(newlistingsCardHeading);
  newlistingsCard.append(newlistingsCardBody);
  newlistingsCard.data("listings", listings);
  return newlistingsCard;
}