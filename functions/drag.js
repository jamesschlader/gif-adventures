export default function drag(ev) {
  ev.originalEvent.dataTransfer.setData("text/plain", ev.target.id);
}
