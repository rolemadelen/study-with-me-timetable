function updateClock() {
  var dt = new Date();
  document.getElementById("datetime").innerHTML = dt.toLocaleTimeString('en-GB');
  setTimeout(updateClock, 1000);
}
updateClock();


