import drawFavorites from "./drawFavorites.js";

export default function killFav(e, searchItem) {
  const victimIndex = searchItem.favorites.indexOf(e.path[2].id);

  searchItem.favorites = JSON.parse(localStorage.getItem("favorites"));
  searchItem.favorites.splice(victimIndex, 1);
  localStorage.setItem("favorites", JSON.stringify(searchItem.favorites));
  drawFavorites(searchItem);
} //end killFav
