var schools=[
      {schoolName:"Southeast Elementary", zipCode: 64150, rating: 6},
      {schoolName:"Line Creek Elementary School", zipCode: 64150, rating: 5},
      {schoolName:"Park Hill South High School", zipCode: 64150, rating: 7},
      {schoolName:"West Englewood Elementary School", zipCode: 64118, rating: 9},
      {schoolName:"Clardy Elementary School", zipCode: 64118, rating: 8},
      {schoolName:"Crestview Elementary School", zipCode: 64116, rating: 8},
      {schoolName:"Davidson Elementary School", zipCode: 64118, rating: 8},
      {schoolName:"Oak Park High School", zipCode: 64118, rating: 8},
      {schoolName:"Topping Elementary School", zipCode: 64117, rating: 8},
      {schoolName:"Antioch Middle School", zipCode: 64118, rating: 7},
      {schoolName:"Gracemor Elementary School", zipCode: 64119, rating: 7},
      {schoolName:"Linden West Elementary School", zipCode: 64118, rating: 7},
      {schoolName:"Gashland Elementary School", zipCode: 64118, rating: 8},
      {schoolName:"Maple Park Middle School", zipCode: 64119, rating: 4},
      {schoolName:"Winnwood Elementary School", zipCode: 64117, rating: 5},
      {schoolName:"Winnetonka High School", zipCode: 64119, rating: 5},
      {schoolName:"Eastgate Middle School", zipCode: 64117, rating: 5},
      {schoolName:"Chouteau Elementary School", zipCode: 64117, rating: 5},
      {schoolName:"Briarcliff Elementary School", zipCode: 64116, rating: 5},
      {schoolName:"Northgate Middle School", zipCode: 64118, rating:  6},
      {schoolName:"Lakewood Elementary School", zipCode: 64117, rating: 6},
      {schoolName:"Ravenwood Elementary School", zipCode: 64119, rating: 7},
      {schoolName:"Oakwood Manor Elementary School", zipCode: 64118, rating: 7},
      {schoolName:"North Kansas City High School", zipCode: 64116, rating: 7},
      {schoolName:"Meadowbrook Elementary School", zipCode: 64118, rating: 7},
      {schoolName:"Maplewood Elementary School", zipCode: 64119, rating: 7}
  ];
  

$(document).ready(function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (var registration of registrations) {
        registration.unregister();
        console.log("Unregistered Service Workers");
      }
    }).then(() => {
      navigator.serviceWorker.register("/js/service-worker.js", { scope: "/js/" }).then((reg) => {
      }).catch(err => {
        console.error(`Service Worker Error: ${err}`);
      });
    });
  }
  getlistings()
  

  // Container for Displaying Listings
  var listingsContainer = $(".showcase");
  // Variable to hold our listings
  var listings;
  // This function grabs listings from the database and updates the view

  function getlistings() {
    $.get("/listings", function (data) {
      console.log("listings", data);
      listings = data;
      if (!listings || !listings.length) {
        displayEmpty();
      }
      else {
        initializeRows();
        console.log(schools)
      }
    });
  }


  function filterBed(search) {
    $.get("/listings/bedrooms/" + search, function (data) {
      console.log("listings", data);
      var url = window.location
      console.log(url)
      listings = data;
      if (!listings || !listings.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  function filterPrice(minParse, maxParse) {
    $.get("/listings/price?min=" + minParse + "&max=" + maxParse, function (data) {
      console.log("listings", data);
      // var url = window.location
      // console.log(url)
      listings = data;
      if (!listings || !listings.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside listingsContainer
  function initializeRows() {
    listingsContainer.empty();
    var listingsToAdd = [];
    for (var i = 0; i < listings.length; i++) {
      listingsToAdd.push(createNewRow(listings[i]));
    }
    listingsContainer.append(listingsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(listings) {
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
    var newlistingsTitle = $("<h4>");

    //image//----------------------------------------------------
    var listingImage = $("<img>");
    listingImage.attr('src', listings.image)
    listingImage.css({
      float: "left"
    })
    //image//--------------------------------------------------------

    // var newlistingsDate = $("<small>");
    var newlistingsAuthor = $("<h5>");
    // edit
    newlistingsAuthor.text("Created by: " + listings.sellerName);
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
    heatCool.text("Heating & Cooling: " + listings.hotAndCold);
    dataSqFt.text("Area: " + listings.sqFootage + " sq. ft.");
    dataBed.text("Bedrooms: " + listings.bedrooms);
    dataEmail.text("Contact email: " + listings.email);
    listItem.append(dataSqFt);
    listItem.append(dataBed);
    listItem.append(heatCool);
    listItem.append(dataEmail);
    resultList.addClass("result");
    resultList.append(listItem);
    newlistingsCardBody.append(resultList);
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
  function displayEmpty() {
    console.log("nothing!")
  }

  function getZipListings(apiArray) {
    $.get("/listings", function (data) {
      console.log("listings", data);
      console.log(apiArray)
      listings1 = data;
      var matchArray=[];
      
      for(let i=0; i<listings1.length; i++){
        for(let j=0; j<apiArray.length; j++){
          console.log(apiArray[j])
          if(apiArray[j]==listings1[i].areaZip){
            matchArray.push(listings1[i])
            listings=matchArray;
        }
        }
      }
      initializeRows(listings);
      
    });
  }


  // Buyer Page //
  // Search and Filter Functions//

  $("#searchButton").on("click", function (event) {
    event.preventDefault();
    var search;

    if ($('input[name="filter"]:checked').val()) {
      var switchVal = $('input[name="filter"]:checked').val();
      switch (switchVal) {
        case "one":
          var min = $("#minPrice").val();
          var max = $("#maxPrice").val();
          var minParse = parseInt(min)
          var maxParse = parseInt(max)
          search=maxParse;
          if (minParse >= 0 && maxParse >= 1) {
            // filterPrice(minParse, maxParse)
            
            filterPrice(minParse, maxParse)
            break;
          }
          else {
            return false;
          }
        case "two":
          
         //zipcode map // https://www.unitedstateszipcodes.org/64116/

          var zipCodeArray = [64119, 64118, 64116, 64117, 64150]
          var zipcode = $("#areaSelect").val().trim();
          var zipParse = parseInt(zipcode)
          var radius = $("#zipRadius").val();

          for (i = 0; i < zipCodeArray.length; i++) {
            var zip = zipCodeArray[i];
            if (radius != "" && zipcode.length === 5 && zipParse === zip) {
              alert("yes")
              areaCode(zipParse, radius)
              break;
            }
            return false;
          }

        case "three":
          var bed = $("#bedNum").val();
          var bedParse = parseInt(bed)
          if (bedParse >= 1) {
            search = bedParse;
            $("#bedNum").val("")
            filterBed(bedParse)
            break;
          }
          return false;
      }
    }
   
    function areaCode(zipcodeParse, radius) {
      console.log(zipcodeParse)
      var apiArray=[];
      var queryURL = "https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=" + zipcodeParse + "&minimumradius=0&maximumradius=" + radius + "&key=OTXG2RB5WPBTU3O8BZEA";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        for (i = 0; i < response.DataList.length; i++) {
          apiArray.push(response.DataList[i].Code)
          
        }
        getZipListings(apiArray)
      });
    }
  });


})