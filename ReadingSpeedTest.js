
let text = document.getElementById("text").innerText
let startButton = document.getElementById("start")
let doneButton = document.getElementById("done")
let resetButton = document.getElementById("reset")
let changeText = document.getElementById("changeText");
let localStorage = window.localStorage;
var start = 0;
var isTesting = false;

function WordCount(str) {
    return str.split(' ')
    .filter(function(n) { return n != '' })
    .length
}


document.addEventListener("DOMContentLoaded", () => {
    if (  localStorage.getItem('text')) {
        document.getElementById("text").innerText = localStorage.getItem('text');
    }
})
startButton.addEventListener("click", function(){
    start = Date.now()
    startButton.disabled = true;
    startButton.style.opacity = 0.2;
    doneButton.style.opacity = 1;
    doneButton.disabled = false;
    isTesting = true;
    changeText.disabled = true;
    changeText.style.opacity = 0.2;

})

doneButton.addEventListener("click", function(){
    if (isTesting) {
    var textLength = WordCount(text);
    var milliseconds = Date.now() - start;
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    var wordsPerMinute = textLength / minutes;

   doneButton.opacity = 0.2;
   doneButton.innerText = `You can read ${Math.round(wordsPerMinute)} words per minute`;
   doneButton.style.width = "80%";
   doneButton.style.marginLeft = "10%";
   doneButton.style.marginRight = "10%";
doneButton.style.transitionDuration = ".5s";
doneButton.disabled = true;
changeText.disabled = false;
changeText.style.opacity = 1;



    }
})


resetButton.addEventListener("click", function(){
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
 $("html, body").animate({ scrollTop: 0 }, 400);
 changeText.disabled = false;
changeText.style.opacity = 1;
})


changeText.addEventListener("click", () => {
    $("#overlay").show(500);
})

$("#exitPopup").click(() => {
    $("#overlay").hide(500);
})

$("#doneWithChangeText").click(() => {
    text = $("#changeTextTextArea").val();
    $("#overlay").hide(500);
    document.getElementById("text").innerText = $("#changeTextTextArea").val();
    localStorage.setItem('text', text);
    
})