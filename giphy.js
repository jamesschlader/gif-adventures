
var searchItem = {

    topics: ["avengers", "justice league", "wonder woman", "superman", "batman", "thor", "hulk", "iron man", "doctor strange", "spiderman", "green lantern", "captain america", "captain marvel"],
    
    favorites: [],
    
    userSearches: [],

    }

function drawButtons() {
    $("#button-home").empty();
  
    searchItem.userSearches = JSON.parse(localStorage.getItem("searches"));

    if (!Array.isArray(searchItem.userSearches)) {
    searchItem.userSearches = [];
    };

    var defaultList = searchItem.topics;
    var userList = searchItem.userSearches;
   

for (i = 0; i < defaultList.length; i++) {
    var newButton = $("<button></button");
    newButton.addClass("action-button");
    var text = defaultList[i]; 
    newButton.text(text);
    newButton.attr("type", "button");
    newButton.attr("id",defaultList[i]);
    newButton.data("name",defaultList[i]);
    $("#button-home").prepend(newButton);
}

for (i = 0; i < userList.length; i++) {
    var newButton = $("<button></button");
    newButton.addClass("action-button");
    newButton.css("background-color", "red");
    var text = userList[i]; 
    newButton.text(text);
    newButton.attr("type", "button");
    newButton.data("name", userList[i]);
    newButton.attr("id", userList[i]);
    $("#button-home").prepend(newButton);
}

}; //end drawButtons

function drawFavorites() {

    $("#drop-zone").empty();

    if (!Array.isArray(searchItem.favorites)) {
        searchItem.favorites = [];
        };

    searchItem.favorites = JSON.parse(localStorage.getItem("favorites"));

    var favs = searchItem.favorites;

        for (i = 0; i < favs.length; i++) {
    
        var title = favs[i];
    
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/" + title + "?api_key=XoIMTXFuV8iUDifTj554Rw5rzzAXem2r",
            method: "GET"
        }).then(function(response){

        var showDiv = $("<span class='hero-card'>");
        showDiv.attr("draggable", "true");
        showDiv.attr("ondragstart", "drag(event)");
        showDiv.attr("id", response.data.id);
        showDiv.data("text", response.data.id);

        var gifImage = $("<img class='gifs'>");
        gifImage.attr("state-still", response.data.images.original_still.url);
        gifImage.attr("state-animate", response.data.images.original.url);
        gifImage.attr("state", "still");
        gifImage.attr("text", response.data.id);
        gifImage.attr("id", response.data.id);
        gifImage.attr("src", response.data.images.original_still.url);

        var text = $("<div class='hero-text'>")
        var rating = response.data.rating;
        var name = $("<p>").text(title);
        var p = $("<p>").text("Rated " + rating.toUpperCase());
        var killButton = $("<button></button");
        killButton.addClass("kill-button");
        killButton.attr("type", "button");
        killButton.text("Delete from Favorites");
        text.append(name, p, killButton);
        showDiv.append(gifImage, text);
        $("#drop-zone").prepend(showDiv);

        }); //end ajax draw

    };

}; // end function drawfavorites

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
};

function allowDrop(ev) {
    ev.preventDefault();
};

function drop(ev) { 
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text"); 
    var object = document.getElementById(data);  
    ev.target.appendChild(object);
    searchItem.favorites.push(object);
    localStorage.setItem("favorites", JSON.stringify(searchItem.favorites));
};

function getGif(e) {
    var title = e.target.id;

   $.ajax({
     url: "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=XoIMTXFuV8iUDifTj554Rw5rzzAXem2r&limit=10",
     method: "GET"
   }).then(function(response) {
  
       for (i = 0; i < response.data.length; i++) {
           if (response.data[i].rating !== "r" && response.data[i].rating !== "pg-13") {
 
    var showDiv = $("<span class ='hero-card'>");
    showDiv.attr("draggable", "true");
    showDiv.attr("ondragstart", "drag(event)");
    showDiv.attr("id", response.data[i].id);
    showDiv.data("text", response.data[i].id);

    var gifImage = $("<img class='gifs'>");
    gifImage.attr("state-still", response.data[i].images.original_still.url);
    gifImage.attr("state-animate", response.data[i].images.original.url);
    gifImage.attr("state", "still");
    gifImage.attr("text", response.data[i].id);
    gifImage.attr("id", response.data[i].id);
    gifImage.attr("src", response.data[i].images.original_still.url);

    var text = $("<div class='hero-text'>")
    var rating = response.data[i].rating;
    var name = $("<p>").text(title);
    var p = $("<p>").text("Rated " + rating.toUpperCase());
    var favButton = $("<button></button");
    favButton.addClass("fav-button");
    favButton.attr("type", "button");
    favButton.text("Add to Favorites");
    text.append(name, p, favButton);
    showDiv.append(gifImage, text);
    $("#display").prepend(showDiv);
    
}

function playStop() {
    var state = $(this).attr("state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("state-animate"));
        $(this).attr("state", "animate");
    } else {
        $(this).attr("src", $(this).attr("state-still"));
        $(this).attr("state", "still");
    }
}

$("img").on("click", playStop);
   
}
});
   
}; //end getGif

function search() {
    
    $("#search-button").submit(function(event) {
        event.preventDefault();
    });
    var searchTerm = $("#main-search").val();
    $("#main-search").val("");
        
    searchItem.userSearches.push(searchTerm); 
    localStorage.setItem("searches", JSON.stringify(searchItem.userSearches));  
    drawButtons();
} //end function search()

function addFav(e) {
    searchItem.favorites.push(e.path[2].id);
   
    localStorage.setItem("favorites", JSON.stringify(searchItem.favorites));
    drawFavorites();
}//end addFav

function killFav(e) {

    //find the index of the item in the searchItem.favorites array that matches e.data.id

    var victim = e.path[2].id;
    var victimIndex = searchItem.favorites.indexOf(victim);

    searchItem.favorites = JSON.parse(localStorage.getItem("favorites"));
    searchItem.favorites.splice(victimIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(searchItem.favorites));
    drawFavorites();
}//end killFav

function killButton(e) {
    var victim = e.path[0].id;
    var victimIndex = searchItem.userSearches.indexOf(victim);

    searchItem.favorites = JSON.parse(localStorage.getItem("searches"));
    searchItem.userSearches.splice(victimIndex, 1);
    localStorage.setItem("searches", JSON.stringify(searchItem.userSearches));
    drawButtons();

}//end killButton

function killDisplay() {
    $("#display").empty();
}//end killDisplay

//listeners start here
//==============================================================================

$("#display").on("click", ".fav-button", function() {
    $(".fav-button").submit(function(e){
        e.preventDefault();
    });
    addFav(event)
});

$("#drop-zone").on("click", ".kill-button", function() {
    $(".kill-button").submit(function(e){
        e.preventDefault();
    });
    killFav(event)
});

$("#button-home").on("click", ".action-button", function() {
    $(".action-button").submit(function(e){
        e.preventDefault();
    });
    getGif(event);
});

$("#button-home").on("dblclick", ".action-button", function() {
    $(".action-button").submit(function(e){
        e.preventDefault();
    });
    killButton(event);
});

$("#wrapper").on("click", ".action-button", function() {
    $(".action-button").submit(function(e){
        e.preventDefault();
    });
    killDisplay(event);
});
 
$("#search-button").on("click", function() {
    $("#search-button").submit(function(event) {
        event.preventDefault();
    });
    search();
});
drawButtons();
drawFavorites()
