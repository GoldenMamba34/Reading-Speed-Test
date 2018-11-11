let text = document.getElementById("text").innerText;
let startButton = document.getElementById("start");
let doneButton = document.getElementById("done");
let resetButton = document.getElementById("reset");
let changeText = document.getElementById("changeText");
let localStorage = window.localStorage;
var start = 0;
var isTesting = false;

function CountWords(str) {
  return str.trim().split(/\s+/).length;
}
function fancyTimeFormat(time) {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;
  var ret = "";

  if (hrs > 0) {
    ret += " " + hrs + " Hours " + (mins < 0 ? "0" : "");
  }

  ret += "" + mins + " Minutes " + (secs < 0 ? "0" : "");
  ret += "" + secs + " Seconds ";
  return ret;
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("text")) {
    document.getElementById("text").innerText = localStorage.getItem("text");
    $("#wordCount").text(`${CountWords(localStorage.getItem("text"))} Words`);
  }
});
$("#wordsPerMinuteInput").keydown(function(e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if (
    $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl/cmd+A
    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+C
    (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+X
    (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)
  ) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
  }
});
$("#wordsPerMinuteInput").change(() => {
  $("#howLongWillItTakeToReadLabel").text(
    fancyTimeFormat(
      (CountWords(localStorage.getItem("text")) /
        $("#wordsPerMinuteInput").val()) *
        60
    )
  );
});
startButton.addEventListener("click", function() {
  start = Date.now();

  startButton.disabled = true;
  startButton.style.opacity = 0.2;
  doneButton.style.opacity = 1;
  doneButton.disabled = false;
  isTesting = true;
  changeText.disabled = true;
  changeText.style.opacity = 0.2;
});

doneButton.addEventListener("click", function() {
  if (isTesting) {
    var textLength = CountWords(text);
    var milliseconds = Date.now() - start;
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    var wordsPerMinute = textLength / minutes;

    doneButton.opacity = 0.2;
    doneButton.innerText = `You can read ${Math.round(
      wordsPerMinute
    )} words per minute`;
    doneButton.style.width = "80%";
    doneButton.style.marginLeft = "10%";
    doneButton.style.marginRight = "10%";
    doneButton.style.transitionDuration = ".5s";
    doneButton.disabled = true;
    changeText.disabled = false;
    changeText.style.opacity = 1;
  }
});

resetButton.addEventListener("click", function() {
  doneButton.style.opacity = 0.2;
  doneButton.innerText = "Done";
  doneButton.style.width = "50%";
  doneButton.style.marginLeft = "25%";
  doneButton.style.marginRight = "25%";
  doneButton.style.transitionDuration = ".3s";
  doneButton.disabled = true;

  startButton.disabled = false;
  startButton.style.opacity = 1;
  isTesting = false;
  $("html, body").animate(
    {
      scrollTop: 0
    },
    400
  );
  changeText.disabled = false;
  changeText.style.opacity = 1;
});

changeText.addEventListener("click", () => {
  $("#overlay").show(500);
});

$("#exitPopup").click(() => {
  $("#overlay").hide(500);
});

$("#doneWithChangeText").click(() => {
  text = $("#changeTextTextArea").val();
  $("#overlay").hide(500);
  document.getElementById("text").innerText = $("#changeTextTextArea").val();
  localStorage.setItem("text", text);
  $("#wordCount").text(`${CountWords(localStorage.getItem("text"))} Words`);
});
