// GLOBAL VARIABLES
//*****************************************************************************************/







// FUNCTION
//*****************************************************************************************/
$(function() {
    populateButtons(Topics,"searchButton btn btn-primary", "#buttonsArea");
    //console.log("page loaded");
    console.log(Topics);
})

var Topics = ["Dogs","Cats", "Birds"];

function populateButtons(Topics,classToAdd,areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i< Topics.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',Topics[i]);
        a.text(Topics[i]);
        $(areaToAddTo).append(a);

    }
}

$(document).on("click", ".searchButton",function() {
    $("#searches").empty();
    var type = $(this).data("type");
   // console.log(type);
   var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=dc6zaTOxFJmzC&limit=10"
   //console.log(queryURL); 
   $.ajax({url:queryURL,method:"GET"})
   .done(function(response) {
       //console.log(response);
       for (var i=0; i<response.data.length; i++) {
           var searchDiv = $('<div class = "search-item">');
           var rating = response.data[i].rating;
           var p = $('<p>').text('Rating: '+rating);
           var animated = response.data[i].images.fixed_height.url;
           //searchDiv.append(animated);
           var still = response.data[i].images.fixed_height_still.url;
          // searchDiv.append(still);
           var image = $('<img>');
           searchDiv.append(image);
           $("#searches").append(searchDiv);
           image.attr('src',still);
           image.attr('data-still',still);
           image.attr('data-animated',animated);
           image.attr('data-state','still');
           image.addClass('searchImage');
           searchDiv.append(p);
           searchDiv.append(image);
           $("#searches").append(searchDiv);

       }
   })
})

$(document).on("click",".searchImage",function(){
    var $img = $(this);
    var state = $img.attr("data-state");
    if(state == "still") {
        $img.attr("src",$img.data("animated"));
        $img.attr("data-state","animated");

    } else {
        $img.attr("src",$img.data("still"));
        $img.attr("data-state","still");
    }
})

$('#addGif').on('click',function() {
   
    var newSearch = $('input').eq(0).val();
    if (newSearch == ""){
        return false; // added so user cannot add a blank button
      }
    
    Topics.push(newSearch);
    
    populateButtons(Topics,"searchButton btn btn-primary", "#buttonsArea");
    // prevent reloaded the page
    return false;
})

$('#removeGif').on('click',function() {
   
    var newSearch = $('input').eq(0).val();
    
    Topics.pop(newSearch);
    
    populateButtons(Topics,"searchButton btn btn-primary", "#buttonsArea");
    // prevent reloaded the page
    return false;
})



// MAIN PROCESSES
//*****************************************************************************************/
// Starts the game the First Time.

