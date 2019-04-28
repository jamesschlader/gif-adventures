import topicArray from "./utilities/topics.js";
import drawButtons from "./functions/drawButtons.js";
import drawFavorites from "./functions/drawFavorites.js";
import search from "./functions/search.js";
import addFav from "./functions/addFav.js";
import killButton from "./functions/killButton.js";
import killFav from "./functions/killFav.js";
import playStop from "./functions/playStop.js";
import killDisplay from "./functions/killDisplay.js";
import getGif from "./functions/getGif.js";
import drag from "./functions/drag.js";
import drop from "./functions/drop.js";
import allowDrop from "./functions/allowDrop.js";

let searchItem = {
  topics: topicArray,
  favorites: [],
  userSearches: []
};

//listeners start here
//==============================================================================

$("#display").on("click", ".fav-button", () => {
  $(".fav-button").submit(e => {
    e.preventDefault();
  });
  addFav(event, searchItem);
});

$("#drop-zone").on("click", ".kill-button", () => {
  $(".kill-button").submit(e => {
    e.preventDefault();
  });
  killFav(event, searchItem);
});

$("#drop-zone").on("dragover", e => allowDrop(e));
$("#drop-zone").on("drop", e => {
  console.log(e);
  drop(e, searchItem);
});
$("#display").on("dragstart", ".hero-card", e => {
  console.log(e);
  drag(e);
});

$("#button-home").on("click", ".action-button", () => {
  $(".action-button").submit(e => {
    e.preventDefault();
  });
  getGif(event);
});

$("#button-home").on("dblclick", ".action-button", () => {
  $(".action-button").submit(e => {
    e.preventDefault();
  });
  killButton(event, searchItem);
});

$("#wrapper").on("click", ".action-button", () => {
  $(".action-button").submit(e => {
    e.preventDefault();
  });
  killDisplay();
});

$("#search-button").on("click", () => {
  $("#search-button").submit(event => {
    event.preventDefault();
  });
  search(searchItem);
});

$("#display").on("click", "img", e => playStop(e));
$("#drop-zone").on("click", "img", e => playStop(e));

drawButtons(searchItem);
drawFavorites(searchItem);
