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
    hotAndCold:$("#hotAndCold").val()
  };

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
});
