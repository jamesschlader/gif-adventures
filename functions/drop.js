import drawFavorites from "./drawFavorites.js";

export default function drop(ev, searchItem) {
  ev.preventDefault();
  const data = ev.originalEvent.dataTransfer.getData("text/plain");
  searchItem.favorites.push(data);
  localStorage.setItem("favorites", JSON.stringify(searchItem.favorites));
  drawFavorites(searchItem);
}
