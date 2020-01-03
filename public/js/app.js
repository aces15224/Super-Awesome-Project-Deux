// School Info and Ratings calculator
function schoolsInfo(listings) {
  var schoolZipArray = [];
  var top5 = 0;
  var topRating = 0;
  var sum = 0;
  var average = 0;
  var averageFixed = 0;

  // makes sure home zipcode matches school zip
  for (let i = 0; i < schools.length; i++) {
    if (schools[i].zipCode === listings[0].areaZip) {
      schoolZipArray.push(schools[i]);
      console.log(schoolZipArray);
    }
  }
  // calculates average school rating
  for (let i = 0; i < schoolZipArray.length; i++) {
    sum += schoolZipArray[i].rating;
    average = sum / schoolZipArray.length;
    averageFixed = average.toFixed(2);
    $("#average").html("<b>Average School Rating:</b> " + averageFixed);
  }
  // determines how many top 3 schools are in the area
  for (let i = 0; i < schoolZipArray.length; i++) {
    if (schoolZipArray[i].rating >= 7) {
      top5++;
    }
    $("#tops").html("<b>Number of Top 3 Schools in the area: </b>" + top5);
  }
  // determines and lists the top rated school in the area
  for (let i = 0; i < schoolZipArray.length; i++) {
    if (schoolZipArray[i].rating > topRating) {
      topRating = schoolZipArray[i].rating;
    }
    if (schoolZipArray[i].rating === topRating) {
      console.log(topRating);
      $("#schoolNames").html("<b>Top Rated School: </b>" + schoolZipArray[i].schoolName + " (" + schoolZipArray[i].rating + "/10)");
    }
  }
}
// list of school names, zips, and ratings
var schools = [
  { schoolName: "Southeast Elementary", zipCode: 64150, rating: 6 },
  { schoolName: "Line Creek Elementary School", zipCode: 64150, rating: 5 },
  { schoolName: "Park Hill South High School", zipCode: 64150, rating: 7 },
  { schoolName: "West Englewood Elementary School", zipCode: 64118, rating: 9 },
  { schoolName: "Clardy Elementary School", zipCode: 64118, rating: 8 },
  { schoolName: "Crestview Elementary School", zipCode: 64116, rating: 8 },
  { schoolName: "Davidson Elementary School", zipCode: 64118, rating: 8 },
  { schoolName: "Oak Park High School", zipCode: 64118, rating: 8 },
  { schoolName: "Topping Elementary School", zipCode: 64117, rating: 8 },
  { schoolName: "Antioch Middle School", zipCode: 64118, rating: 7 },
  { schoolName: "Gracemor Elementary School", zipCode: 64119, rating: 7 },
  { schoolName: "Linden West Elementary School", zipCode: 64118, rating: 7 },
  { schoolName: "Gashland Elementary School", zipCode: 64118, rating: 8 },
  { schoolName: "Maple Park Middle School", zipCode: 64119, rating: 4 },
  { schoolName: "Winnwood Elementary School", zipCode: 64117, rating: 5 },
  { schoolName: "Winnetonka High School", zipCode: 64119, rating: 5 },
  { schoolName: "Eastgate Middle School", zipCode: 64117, rating: 5 },
  { schoolName: "Chouteau Elementary School", zipCode: 64117, rating: 5 },
  { schoolName: "Briarcliff Elementary School", zipCode: 64116, rating: 5 },
  { schoolName: "Northgate Middle School", zipCode: 64118, rating:  6 },
  { schoolName: "Lakewood Elementary School", zipCode: 64117, rating: 6 },
  { schoolName: "Ravenwood Elementary School", zipCode: 64119, rating: 7 },
  { schoolName: "Oakwood Manor Elementary School", zipCode: 64118, rating: 7 },
  { schoolName: "North Kansas City High School", zipCode: 64116, rating: 7 },
  { schoolName: "Meadowbrook Elementary School", zipCode: 64118, rating: 7 },
  { schoolName: "Maplewood Elementary School", zipCode: 64119, rating: 7 }
];

// waits for page to load and initializes filter functions
$(document).ready(function() {
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
  getlistings();

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

  // Bedroom Search
  function filterBed(search) {
    $.get("/listings/bedrooms/" + search, function (data) {
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

  // Price Range Function
  function filterPrice(minParse, maxParse) {
    $.get("/listings/price?min=" + minParse + "&max=" + maxParse, function(data) {
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

  // InitializeRows handles appending all of our constructed post HTML inside listingsContainer
  function initializeRows() {
    listingsContainer.empty();
    var listingsToAdd = [];
    for (var i = 0; i < listings.length; i++) {
      if (listings.length > 1) {
        listingsToAdd.push(createNewRow(listings[i]));
      }
      else{
        listingsToAdd.push(createDetailPage(listings[i]));
      }
    }
    listingsContainer.append(listingsToAdd);
  }
  // Creates Listings for Buy Page
  function createNewRow(listings) {
    var newlistingsCard = $("<div>");
    newlistingsCard.addClass("card");
    newlistingsCard.addClass("listings-card");

    var newlistingsCardHeading = $("<div>");
    newlistingsCardHeading.addClass("card-header");
    var newlistingsTitle = $("<h5>");

    // image
    var listingImage = $("<img>");
    listingImage.addClass("listing-image");
    listingImage.attr("src", listings.image);
    listingImage.attr("id", listings.id);
    listingImage.css({
      float: "left"
    });

    var newlistingsAuthor = $("<h7>");
    newlistingsAuthor.text("Lister: " + listings.sellerName);
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
    var clickFor = $("<p>");

    heatCool.text("Heating & Cooling: " + listings.hotAndCold);
    dataSqFt.text("Area: " + listings.sqFootage + " sq. ft.");
    dataBed.text("Bedrooms: " + listings.bedrooms);
    dataEmail.text("Email: " + listings.email);
    clickFor.text("Click Picture for Details!");
    clickFor.addClass("click-link")

    listItem.append(dataSqFt);
    listItem.append(dataBed);
    listItem.append(heatCool);
    listItem.append(dataEmail);
    listItem.append(clickFor);

    resultList.addClass("result");
    resultList.append(listItem);
    newlistingsCardBody.append(resultList);
    resultList.css({
      float: "right"
    });
    var newlistingsBody = $("<p>");
    newlistingsBody.css({
      float: "right"
    });
    newlistingsTitle.text("Asking price: $" + listings.sellingPrice);
    newlistingsCardBody.append(newlistingsBody);
    newlistingsCardHeading.append(newlistingsTitle);
    newlistingsCardHeading.append(newlistingsAuthor);
    newlistingsCardHeading.append(newlistingsTitle);
    newlistingsCardBody.append(listingImage);
    newlistingsCard.append(newlistingsCardHeading);
    newlistingsCard.append(newlistingsCardBody);
    newlistingsCard.data("listings", listings);
    return newlistingsCard;
  }

  // Individual Listing Buttons

  $(document).on("click", ".specs.btn", function() {
    $("#specs").modal("toggle");
  });

  $(document).on("click", ".school.btn", function() {
    schoolsInfo(listings);
    $("#school").modal("toggle");
  });
  //Detailed Listing Creator
  function createDetailPage(listings) {
    var modalList = $("#detailList");
    var newlistingsCard = $("<div>");
    newlistingsCard.addClass("card");
    newlistingsCard.addClass("details-card");

    var mainImage = $("<img>");
    mainImage.addClass("card-img");
    mainImage.addClass("detail-image");
    mainImage.attr("src", listings.image);
    var mainImageDiv = $("<div>");
    mainImageDiv.addClass("detail-image-div");
    mainImageDiv.append(mainImage);

    var newlistingsCardHeading = $("<div>");
    newlistingsCardHeading.addClass("card-header");

    var newlistingsTitle = $("<h5>");
    newlistingsTitle.text("Asking price: $" + listings.sellingPrice);
    var newlistingsAuthor = $("<h7>");
    newlistingsAuthor.text("Lister: " + listings.sellerName);
    newlistingsAuthor.css({
      float: "right",
      color: "blue"
    });

    var newlistingsCardBody = $("<div>");
    newlistingsCardBody.addClass("card-body");
    newlistingsCardBody.addClass("details-card-body"); 
    var listDiv = $("<div>");
    listDiv.addClass("col-xs-6")
    var detailList = $("<ul>");
    detailList.addClass("list-group list-group-flush")
    var listItemDetail = $("<li>");
    listItemDetail.addClass("list-group-item")
    var dataBedDetail = $("<p>");
    var dataEmailDetail = $("<p>");
    var dataSqFtDetail = $("<p>");
    var heatCoolDetail = $("<p>");
    detailList.css({
      float: "left"
    });
    listDiv.append(detailList);

    var addDetail = $("<div>");
    addDetail.addClass("card-text");
    addDetail.addClass("col-xs-6");
    titleText = $("<h6>");
    titleText.text("Additional Details")
    detailText = $("<p>");
    detailText.text(listings.listingDetails);

    addDetail.prepend(titleText);
    addDetail.append(detailText);

    heatCoolDetail.text("Heating & Cooling: " + listings.hotAndCold);
    dataSqFtDetail.text("Area: " + listings.sqFootage + " sq. ft.");
    dataBedDetail.text("Bedrooms: " + listings.bedrooms);
    dataEmailDetail.text("Email: " + listings.email);
    listItemDetail.append(dataSqFtDetail);
    listItemDetail.append(dataBedDetail);
    listItemDetail.append(heatCoolDetail);
    listItemDetail.append(dataEmailDetail);
    detailList.append(listItemDetail);

    var footer = $("<div>");
    footer.addClass("card-footer");
    var buttonDiv = $("<div>");
    buttonDiv.addClass("col-xs-6");
    var buttonList = $("<ul>");
    buttonList.addClass("list-group list-group-flush");
    var buttonListItem = $("<li>");
    buttonListItem.addClass("list-group-item");
    var deleteBtn = $("<button>");
    deleteBtn.text("DELETE");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var schoolBtn = $("<button>");
    schoolBtn.text("SCHOOL INFO");
    schoolBtn.addClass("school btn btn-warning");
    var specsButton = $("<button>");
    specsButton.text("SPECS");
    specsButton.addClass("specs btn btn-success");

    buttonListItem.append(specsButton);
    buttonListItem.append(schoolBtn);
    buttonListItem.append(editBtn);
    buttonListItem.append(deleteBtn);
    buttonDiv.css({
      float: "right"
    });
    buttonList.append(buttonListItem);
    buttonDiv.append(buttonList);
    footer.append(buttonDiv);
    modalList.append(detailList);

    newlistingsCardHeading.append(newlistingsAuthor);
    newlistingsCardHeading.append(newlistingsTitle);
    newlistingsCardBody.append(addDetail);

    newlistingsCard.append(mainImageDiv);
    newlistingsCard.append(newlistingsCardHeading);
    newlistingsCard.append(newlistingsCardBody);
    newlistingsCard.append(footer);
    newlistingsCard.data("listings", listings);
    return newlistingsCard;
  }

  function displayEmpty() {
    $("#noResults").modal("toggle");
  }

  function getZipListings(apiArray) {
    $.get("/listings", function(data) {
      console.log("listings", data);
      console.log(apiArray);
      listings1 = data;
      var matchArray = [];
      for (let i = 0; i < listings1.length; i++) {
        for (let j = 0; j < apiArray.length; j++) {
          console.log(apiArray[j]);
          if (apiArray[j] == listings1[i].areaZip) {
            matchArray.push(listings1[i]);
            listings = matchArray;
          }
        }
      }
      if (!matchArray || !matchArray.length) {
        displayEmpty();
      }
      else {
        initializeRows(listings);
      }
    });
  }

  // On'click Function For Listing Params 

  $(document).on("click", ".listing-image", function(){
    console.log(this.id)
    $.get("/listings/listings" + this.id, function(data) {
      console.log("listings", data);
      listings = data;
      if (!listings || !listings.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  });

  // Buyer Page //
  // Search and Filter Functions//

  $("#searchButton").on("click", function (event) {
    event.preventDefault();
    var search;
    if ($('input[name="filter"]:checked').val()) {
      var switchVal = $('input[name="filter"]:checked').val();
      switch (switchVal) {
        // price range input
        case "one":
          var min = $("#minPrice").val();
          var max = $("#maxPrice").val();
          var minParse = parseInt(min);
          var maxParse = parseInt(max);
          search = maxParse;
          if (minParse >= 0 && maxParse >= 1) {
            filterPrice(minParse, maxParse);
            $("#minPrice").val("");
            $("#maxPrice").val("");
            break;
          }
          else {
            $("#invalidPrice").modal("toggle")
          }
          // zip code input
        case "two":
          var zipCodeArray = [64119, 64118, 64116, 64117, 64150];
          var zipcode = $("#areaSelect").val().trim();
          var zipParse = parseInt(zipcode);
          var radius = $("#zipRadius").val();
          var zipCount = 1;
        
          for (i = 0; i < zipCodeArray.length; i++) {
            var zip = zipCodeArray[i];
            zipCount++
            console.log(zip);
            console.log(zipParse);
            // checks to see if buttons are selected and all input is filled in
            if (zipParse != zip && zipcode.length === 5 && zipCount > zipcode.length) {
              $("#invalidModal").modal("toggle");
            } 
            else if ($('input[name="filter"]:checked').val() === "two" && radius === "" || $('input[name="filter"]:checked').val() === "two" && zipcode.length != 5){
              $("#noZipOrRadius").modal("toggle")
            }
            else if (radius != "" && zipcode.length === 5 && zipParse === zip) {
              areaCode(zipParse, radius);
              $("#areaSelect").val("");
              break;
            }
          }
        // bedroom input
        case "three":
          var bed = $("#bedNum").val();
          var bedParse = parseInt(bed);
          if (bedParse >= 1) {
            search = bedParse;
            $("#bedNum").val("");
            filterBed(bedParse);
            break;
          }
          else if ($('input[name="filter"]:checked').val() === "three" && bed < 1) {
          $("#invalidBedNum").modal("toggle");
          }
      }
    }
    else{
      $("#noRadioModal").modal("toggle");
    }
    // zip code function for calling zip api
    function areaCode(zipcodeParse, radius) {
      console.log(zipcodeParse)
      var apiArray = [];
      var queryURL = "https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=" + zipcodeParse + "&minimumradius=0&maximumradius=" + radius + "&key=OTXG2RB5WPBTU3O8BZEA";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        for (i = 0; i < response.DataList.length; i++) {
          apiArray.push(response.DataList[i].Code);
        }
        getZipListings(apiArray);
      });
    }
  });
});
