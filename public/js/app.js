// Buyer Page //
// Search and Filter Functions//

$("#searchButton").on("click", function(event){
  event.preventDefault();

  if($('input[name="filter"]:checked').val()){
    var switchVal=$('input[name="filter"]:checked').val();
      switch (switchVal){
        case "one":
          var min = $("#minPrice").val();
          var max = $("#maxPrice").val();
          var minParse = parseInt(min)
          var maxParse = parseInt(max)

          if(minParse >= 0 && maxParse >=1){
            priceMatch(minParse,maxParse)
            break;
          }
          else{
            return false;
          }

        case "two":
          var zipCodeArray=[64116, 64106, 64124, 64105, 64123, 64115, 64117, 64120, 64121, 64127, 64101, 64108, 64102, 66101]
          var zipcode = $("#areaSelect").val().trim();
          var zipParse= parseInt(zipcode)
          var radius = $("#zipRadius").val();

          for(i=0; i<zipCodeArray.length; i++){
            var zip=zipCodeArray[i];
            if(radius!="" && zipcode.length===5 && zipParse===zip){
              alert("yes")
              areaCode(zipParse, radius)
              break; 
            }
            return false;
           }
            
        case "three":
          var bed = $("#bedNum").val();
          var bedParse=parseInt(bed)
          if(bedParse >= 1){
            bedrooms(bedParse)
            break; 
          }
          return false;
      }      
}

function priceMatch(minParse,maxParse){
  console.log(minParse)
  console.log(maxParse)
}

function bedrooms(bedParse){
  console.log(bedParse)
}

function areaCode(zipcodeParse, radius){
  console.log(zipcodeParse)
  var queryURL="https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=" + zipcodeParse + "&minimumradius=0&maximumradius=" + radius + "&key=OTXG2RB5WPBTU3O8BZEA";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      for(i=0; i<response.DataList.length; i++){
        console.log(response.DataList[i].Code)
    }});  
}}); 


// Seller page//
// Create Listing Form 


$("#sellButton").on("click", function(event){
  event.preventDefault();

  var newListing = {
    sellerName: $("#name").val(),
    email: $("#email").val(),
    sellingPrice: $("#price").val(),
    sqFootage: $("#sqFoot").val(),
    bedrooms: $("#bedrooms").val(),
    areaZip: $("#areaZip").val(),
    image: $("#image").val(),
    hotAndCold:$("#hotAndCold")
  };
 
  $.post("/api/new", newListing)
    .then(function(data) {
    console.log(data);
    });

  $("#name").val("");
  $("#email").val("");
  $("#price").val("");
  $("#sqFoot").val("");
  $("#bedrooms").val("");
  $("#areaZip").val("");
  $("#image").val("");
  // CheckBox value may not work
  $("#hotAndCold").val("")
});

// $("#sellButton").on("click", function(event){
//   event.preventDefault();
//   var sellerName = $("#name").val();
//   var email = $("#email").val();

//   var price = $("#price").val();
//   var priceParse = parseInt(price);

//   var sqFoot = $("#sqfoot").val();
//   var sqFootParse = parseInt(sqFoot);

//   var bedrooms = $("#bedrooms").val();
//   var roomParse = parseInt(bedrooms);

//   var areaZip = $("#areaZip").val();
//   var areaZipParse = parseInt(areaZip);
// }