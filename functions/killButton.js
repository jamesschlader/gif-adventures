import drawButtons from "./drawButtons.js";

export default function killButton(e, searchItem) {
  const victimIndex = searchItem.userSearches.indexOf(e.path[0].id);

  searchItem.favorites = JSON.parse(localStorage.getItem("searches"));
  searchItem.userSearches.splice(victimIndex, 1);
  localStorage.setItem("searches", JSON.stringify(searchItem.userSearches));
  drawButtons(searchItem);
} //end killButton
