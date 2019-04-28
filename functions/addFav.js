import drawFavorites from "./drawFavorites.js";

export default function addFav(e, searchItem) {
  searchItem.favorites.push(e.path[2].id);

  localStorage.setItem("favorites", JSON.stringify(searchItem.favorites));
  drawFavorites(searchItem);
} //end addFav
