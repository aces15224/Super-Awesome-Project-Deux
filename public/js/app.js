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
    var newlistingsTitle = $("<h2>");

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
      color: "blue",
      "margin-top":
        "-10px"
    });
    var newlistingsCardBody = $("<div>");
    newlistingsCardBody.addClass("card-body");


    //results list//
    var resultList = $("<ul>");
    var listItem = $("<li>");
    var dataBed = $("<h5>");
    var dataEmail = $("<h5>");
    var dataSqFt = $("<h5>");
    dataSqFt.text("Area: " + listings.sqFootage + " sq. ft.");
    dataBed.text("Bedrooms: " + listings.bedrooms);
    dataEmail.text("Contact email: " + listings.email);
    listItem.append(dataSqFt);
    listItem.append(dataBed);
    listItem.append(dataEmail);
    resultList.append(listItem);
    newlistingsCardBody.append(resultList);
    //results list//


    var newlistingsBody = $("<p>");
    newlistingsBody.css({
      float: "right"
    })
    // edit
    newlistingsBody.text("Contact email: " + listings.email);
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
      listings = data;
      var matchArray=[];
      // for(let i=0; i<apiArray.length; i++){
      //   console.log(apiArray[i])
      // }

      for(let i=0; i<listings.length; i++){
        for(let j=0; j<apiArray.length; j++){
          console.log(apiArray[i])
          if(apiArray[j]==listings[i].areaZip){
            matchArray.push(listings[i].areaZip)
          
          }
        }
        console.log(matchArray)
        console.log(listings[i].areaZip)
      }



      
      if (!listings || !listings.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
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
          var zipCodeArray = [64116, 64106, 64124, 64105, 64123, 64115, 64117, 64120, 64121, 64127, 64101, 64108, 64102, 66101]
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