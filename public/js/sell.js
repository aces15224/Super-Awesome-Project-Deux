// Create Listing Form 

$("#sellButton").on("click", function(event){
  event.preventDefault();
  var zipCodeArray = [64116, 64106, 64124, 64105, 64123, 64115, 64117, 64120, 64121, 64127, 64101, 64108, 64102, 66101]
  var zipcode = $("#areaZip").val().trim();
  var zipParse = parseInt(zipcode)

  for (i = 0; i < zipCodeArray.length; i++) {
    var zip = zipCodeArray[i];
    if (zipParse === zip) {
      alert("yes")
      var newListing = {
        sellerName: $("#name").val(),
        email: $("#email").val(),
        sellingPrice: $("#price").val(),
        sqFootage: $("#sqFoot").val(),
        bedrooms: $("#bedrooms").val(),
        areaZip: $("#areaZip").val(),
        image: $("#image").val(),
        hotAndCold:$("#hotAndCold").val()
    };
  console.log(newListing)

      $.post("/listings", newListing)
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
      $("#hotAndCold").val("")
    }
    return false;
    }
});
