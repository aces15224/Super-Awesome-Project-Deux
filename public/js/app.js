// Buyer Search Button & Ajax Call

$("#searchButton").on("click", function(event){
  event.preventDefault();
  var min = $("#minPrice").val();
  var max = $("#maxPrice").val();
  var zipcode = $("#areaSelect").val().trim();
  var radius = $("#zipRadius").val()
  var bed = $("#bedNum").val()
  
  if(min >= 0 && max >= 1 && zipcode === "" && radius === "" && bed === ""){
    alert("Yes")
  }
  
  if(min === "" && max === "" && zipcode === "" && radius === "" && bed >= 1){
    alert("YAR")
  }

  if(min === "" && max === "" && zipcode.length === 5 && radius != "" && bed === ""){
    zipCode(zipcode, radius)
  }    
}); 

// ZipCode Function //

function zipCode(zipcode, radius){
  var queryURL="https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=" + zipcode + "&minimumradius=0&maximumradius=" + radius + "&key=OTXG2RB5WPBTU3O8BZEA";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      for(i=0; i<response.DataList.length; i++){
        console.log(response.DataList[i].Code)
  }});  
} 
 