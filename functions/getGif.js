export default function getGif(e) {
  const title = e.target.id;

  $.ajax({
    url: `https://api.giphy.com/v1/gifs/search?q=${title}&api_key=XoIMTXFuV8iUDifTj554Rw5rzzAXem2r&limit=10`,
    method: "GET"
  }).then(function(response) {
    for (let i = 0; i < response.data.length; i++) {
      if (
        response.data[i].rating !== "r" &&
        response.data[i].rating !== "pg-13"
      ) {
        const showDiv = $("<span class ='hero-card'>");
        showDiv.attr("draggable", "true");
        //showDiv.attr("ondragstart", "drag(e)");
        showDiv.attr("id", response.data[i].id);
        showDiv.data("text", response.data[i].title);

        const gifImage = $("<img class='gifs'>");
        gifImage.attr(
          "state-still",
          response.data[i].images.fixed_height_still.url
        );
        gifImage.attr(
          "state-animate",
          response.data[i].images.fixed_height.url
        );
        gifImage.attr("state", "animate");
        gifImage.attr("text", response.data[i].title);
        gifImage.attr("id", response.data[i].id);
        gifImage.attr("src", response.data[i].images.fixed_height.url);

        const text = $("<div class='hero-text'>");
        const rating = response.data[i].rating;
        const name = $("<p>").text(response.data[i].title);
        const p = $("<p>").text("Rated " + rating.toUpperCase());
        const favButton = $("<button></button");
        favButton.addClass("fav-button");
        favButton.attr("type", "button");
        favButton.text("Add to Favorites");
        text.append(name, p, favButton);
        showDiv.append(gifImage, text);
        $("#display").prepend(showDiv);
      }
    }
  });
} //end getGif
