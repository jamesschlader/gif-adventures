export default function drawButtons(searchItem) {
  $("#button-home").empty();

  searchItem.userSearches = JSON.parse(localStorage.getItem("searches"));

  if (!Array.isArray(searchItem.userSearches)) {
    searchItem.userSearches = [];
  }

  const defaultList = searchItem.topics.map(topic => {
    let newButton = $("<button></button");
    newButton.addClass("action-button");
    let text = topic;
    newButton.text(text);
    newButton.attr("type", "button");
    newButton.attr("id", topic);
    newButton.data("name", topic);
    $("#button-home").prepend(newButton);
  });

  const userList = searchItem.userSearches.map(search => {
    let newButton = $("<button></button");
    newButton.addClass("action-button");
    newButton.css("background-color", "red");
    let text = search;
    newButton.text(text);
    newButton.attr("type", "button");
    newButton.data("name", search);
    newButton.attr("id", search);
    $("#button-home").prepend(newButton);
  });
} //end drawButtons
