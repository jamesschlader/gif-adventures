export default function playStop(e) {
  e.stopPropagation();

  const state = $(e.target).attr("state");

  if (state == "still") {
    $(e.target).attr("src", $(e.target).attr("state-animate"));
    $(e.target).attr("state", "animate");
  } else {
    $(e.target).attr("src", $(e.target).attr("state-still"));
    $(e.target).attr("state", "still");
  }
}
