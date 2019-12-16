// Search and Filter Functions//

$("#searchButton").on("click", function(event){
  event.preventDefault();

  if($('input[name="filter"]:checked').val()){
    var switchVal=$('input[name="filter"]:checked').val();
      switch (switchVal){
        case "one":
          var min = $("#minPrice").val();
          var max = $("#maxPrice").val();
          if(min >= 0 && max >=1){
            priceMatch(min,max)
            break;
          }
          else{
            return false;
          }
        case "two":
          var zipcode = $("#areaSelect").val().trim();
          var radius = $("#zipRadius").val();
          if(radius!="" && zipcode.length===5)
            areaCode(zipcode, radius)
            break;

        case "three":
          var bed = $("#bedNum").val();
          if(bed >= 1){
            bedrooms(bed)
            break; 
          }
          return false;
      }
  }

function priceMatch(min, max){
  console.log(min)
  console.log(max)
}

function bedrooms(bed){
  console.log(bed)
}

function areaCode(zipcode, radius){
  var queryURL="https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=" + zipcode + "&minimumradius=0&maximumradius=" + radius + "&key=OTXG2RB5WPBTU3O8BZEA";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      for(i=0; i<response.DataList.length; i++){
        console.log(response.DataList[i].Code)
    }});  
}}); 

 