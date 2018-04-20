// GLOBAL VARIABLES
//*****************************************************************************************/







// FUNCTION
//*****************************************************************************************/
// This function will run upon the page loading and populate the gif buttons
$(function() {
    populateButtons(Topics,"searchButton btn btn-primary", "#buttonsArea");
    //console.log("page loaded");
    console.log(Topics);
})

var Topics = ["Dancing","Eating", "Sleeping", "Weeping","Runnig","Walking","Flying", "Fighting",
             "Looking","Studying","Crossing","Jumping","Juggling","Streching"];

function populateButtons(Topics,classToAdd,areaToAddTo) {
    // need to empty the buttonsArea
    //prevent adding the copies of button each time gif button is added or removed
    $(areaToAddTo).empty();
    for (var i = 0; i< Topics.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',Topics[i]);
        a.text(Topics[i]);
        $(areaToAddTo).append(a);

    }
}
//Adding click event listener to populate correct gif images
$(document).on("click", ".searchButton",function() {
    $("#searches").empty();
    var type = $(this).data("type");
   // console.log(type);
   var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=dc6zaTOxFJmzC&limit=10"
   //console.log(queryURL); 
   //performing an AJAX request with queryURL
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
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $img.attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
    if(state == "still") {
        $img.attr("src",$img.data("animated"));
        $img.attr("data-state","animated");

    } else {
        $img.attr("src",$img.data("still"));
        $img.attr("data-state","still");
    }
})
//Adding click event listner to add new gif button
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

// Adding click event listener to remove last gif added
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

