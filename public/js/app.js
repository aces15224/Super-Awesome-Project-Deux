// Buyer Search Button & Ajax Call

$("#searchButton").on("click", function(event){
    event.preventDefault();
    var zipcode = $("#areaSelect").val().trim();
    var radius = $("#zipRadius").val()
    var queryURL="https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=" + zipcode + "&minimumradius=0&maximumradius=" + radius + "&key=OTXG2RB5WPBTU3O8BZEA";
 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
    for(i=0; i<response.DataList.length; i++){
      console.log(response.DataList[i].Code)
  }});  
}); 