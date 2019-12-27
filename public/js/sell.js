// Create Listing Form 

$("#sellButton").on("click", function(event){
  event.preventDefault();
  var zipCodeArray = [64119, 64118, 64116, 64117, 64150]
  var zipcode = $("#areaZip").val().trim();
  var zipParse = parseInt(zipcode)

  for (i = 0; i < zipCodeArray.length; i++) {
    var zip = zipCodeArray[i];
    if ($("#name").val() ==="" || $("#email").val()==="" || $("#price").val()==="" || $("#sqFoot").val()==="" || $("#bedrooms").val()==="" ||
       $("#areaZip").val()==="" || $("#image").val()===""){
      $("#invalidInput").modal("toggle")
      }

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
    else if ($("#name").val() != "" && $("#email").val()!= "" && $("#price").val()!= "" && $("#sqFoot").val()!= "" && $("#bedrooms").val() != "" &&
            $("#areaZip").val()!= "" && $("#image").val()!= "" && zipParse != zip){
            $("#invalidZip").modal("toggle")
    }
  }
});
