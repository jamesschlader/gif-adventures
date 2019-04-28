export default function search(searchItem) {
  $("#search-button").submit(function(event) {
    event.preventDefault();
  });
  const searchTerm = $("#main-search").val();
  $("#main-search").val("");

  searchItem.userSearches.push(searchTerm);
  localStorage.setItem("searches", JSON.stringify(searchItem.userSearches));
  drawButtons(searchItem);
} //end function search()
