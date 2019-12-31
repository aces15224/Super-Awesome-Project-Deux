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
      if (listings.length>1){
        listingsToAdd.push(createNewRow(listings[i]));
      }
      else{
        listingsToAdd.push(createDetailPage(listings[i]));
      }
      
    }
    listingsContainer.append(listingsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(listings) {
    // var formattedDate = new Date(listings.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newlistingsCard = $("<div>");
    newlistingsCard.addClass("card");
    newlistingsCard.addClass("listings-card");

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

  function createDetailPage(listings) {
    var newlistingsCard = $("<div>");
    newlistingsCard.addClass("card");
    newlistingsCard.addClass("details-card");

    var mainImage = $("<img>");
    mainImage.addClass("card-img-top");
    mainImage.addClass("detail-image");
    mainImage.attr('src', listings.image);

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

    var detailList = $("<ul>");
    detailList.addClass("list-group list-group-flush")
    var listItemDetail = $("<li>");
    listItemDetail.addClass("list-group-item")
    var dataBedDetail = $("<p>");
    var dataEmailDetail = $("<p>");
    var dataSqFtDetail = $("<p>");
    var heatCoolDetail = $("<p>");
    detailList.css({
      float: "left",
    });

    var addDetail = $("<p>");
    addDetail.addClass("card-text");
    addDetail.text("Additional Details: " + listings.listingDetails);
    addDetail.css({
      float: "right",
    });

    heatCoolDetail.text("Heating & Cooling: " + listings.hotAndCold);
    dataSqFtDetail.text("Area: " + listings.sqFootage + " sq. ft.");
    dataBedDetail.text("Bedrooms: " + listings.bedrooms);
    dataEmailDetail.text("Email: " + listings.email);
    listItemDetail.append(dataSqFtDetail);
    listItemDetail.append(dataBedDetail);
    listItemDetail.append(heatCoolDetail);
    listItemDetail.append(dataEmailDetail);
    detailList.append(listItemDetail);

    newlistingsCardHeading.append(newlistingsAuthor);
    newlistingsCardHeading.append(newlistingsTitle);
    newlistingsCardBody.append(detailList);
    newlistingsCardBody.append(addDetail);



    newlistingsCard.append(mainImage);
    newlistingsCard.append(newlistingsCardHeading);
    newlistingsCard.append(newlistingsCardBody)


    newlistingsCard.data("listings", listings);
    return newlistingsCard;
  }

  function displayEmpty() {
    $("#noResults").modal("toggle")
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
    $.get("/listings/listings"+ this.id, function (data) {
      console.log("listings", data);
      listings = data;
      if (!listings || !listings.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  })


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
            filterPrice(minParse, maxParse)
            $("#minPrice").val("");
            $("#maxPrice").val("");
            break;
          }
          else {
            $("#invalidPrice").modal("toggle")
          }
        case "two":
          
          var zipCodeArray = [64119, 64118, 64116, 64117, 64150]
          var zipcode = $("#areaSelect").val().trim();
          var zipParse = parseInt(zipcode)
          var radius = $("#zipRadius").val();

        
          for (i = 0; i < zipCodeArray.length; i++) {
            var zip = zipCodeArray[i];
            if (zipParse!=zip && zipcode.length === 5){
              $("#invalidModal").modal("toggle")
            } 
            else if ($('input[name="filter"]:checked').val() === "two" && radius === "" || $('input[name="filter"]:checked').val() === "two" && zipcode.length != 5){
              $("#noZipOrRadius").modal("toggle")
            }
            else if (radius != "" && zipcode.length === 5 && zipParse === zip) {
              areaCode(zipParse, radius)
              $("#areaSelect").val("")
              break;
            }
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
          else if ($('input[name="filter"]:checked').val() === "three" && bed < 1){
          $("#invalidBedNum").modal("toggle")
          }
        }
    }
    else{
      $("#noRadioModal").modal("toggle")
      
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