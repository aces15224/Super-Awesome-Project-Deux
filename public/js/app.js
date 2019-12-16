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
          var zipCodeArray=[64116, 64106, 64124, 64105, 64123, 64115, 64117, 64120, 64121, 64127, 64101, 64108, 64102, 66101]
          var zipcode = $("#areaSelect").val().trim();
          var zipParse= parseInt(zipcode)
          var radius = $("#zipRadius").val();

          for(i=0; i<zipCodeArray.length; i++){
            var zip=zipCodeArray[i];
            if(radius!="" && zipcode.length===5 && zipParse===zip){
              alert("yes")
              areaCode(zipcode, radius)
              break; 
            }
            return false;
           }
            
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

 