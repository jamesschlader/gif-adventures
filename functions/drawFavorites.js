import drag from "./drag.js";

export default function drawFavorites(searchItem) {
  $("#drop-zone").empty();

  if (!Array.isArray(searchItem.favorites)) {
    searchItem.favorites = [];
  }

  JSON.parse(localStorage.getItem("favorites")) !== null
    ? (searchItem.favorites = JSON.parse(localStorage.getItem("favorites")))
    : (searchItem.favorites = []);

  let favs = searchItem.favorites;

  for (let i = 0; i < favs.length; i++) {
    let titleMain = favs[i];

    $.ajax({
      url: `https://api.giphy.com/v1/gifs/${titleMain}?api_key=XoIMTXFuV8iUDifTj554Rw5rzzAXem2r`,
      method: "GET"
    }).then(response => {
      const { id, title, images, rating } = response.data;

      const showDiv = $("<span class='hero-card'>");
      showDiv.attr("draggable", "true");
      showDiv.attr("ondragstart", `${event => drag(event)}`);
      showDiv.attr("id", id);
      showDiv.data("text", title);

      const gifImage = $("<img class='gifs'>");
      gifImage.attr("state-still", images.fixed_height_still.url);
      gifImage.attr("state-animate", images.fixed_height.url);
      gifImage.attr("state", "animate");
      gifImage.attr("text", title);
      gifImage.attr("id", id);
      gifImage.attr("src", images.fixed_height.url);

      const text = $("<div class='hero-text'>");

      const name = $("<p>").text(title);
      const p = $("<p>").text("Rated " + rating.toUpperCase());
      const killButton = $("<button></button");
      killButton.addClass("kill-button");
      killButton.attr("type", "button");
      killButton.text("Delete from Favorites");
      text.append(name, p, killButton);
      showDiv.append(gifImage, text);
      $("#drop-zone").prepend(showDiv);

      //end ajax draw
    });
  }
} // end function drawfavorites
