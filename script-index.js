// Document elements
let grid = document.querySelector(".grid");
let squares = document.querySelectorAll(".grid div");
// Declared variables
let message;
// Listeners for menu hover
$(`#menu-item-0`).hover(function(){
    $(`#menu-icon-0`).html('<img class="selection-icon" src="images/blue-disc.png">');
    }, function(){
    $(`#menu-icon-0`).html("");
});
$(`#menu-item-1`).hover(function(){
    $(`#menu-icon-1`).html('<img class="selection-icon" src="images/blue-disc.png">');
    }, function(){
    $(`#menu-icon-1`).html("");
});
$(`#menu-item-2`).hover(function(){
    $(`#menu-icon-2`).html('<img class="selection-icon" src="images/blue-disc.png">');
    }, function(){
    $(`#menu-icon-2`).html("");
});
$(`#menu-item-3`).hover(function(){
    $(`#menu-icon-3`).html('<img class="selection-icon" src="images/blue-disc.png">');
    }, function(){
    $(`#menu-icon-3`).html("");
});
// Listener for click
$("#menu-item-0").click(function() {
    localStorage.setItem("cpuActive", true);
    document.location.href = 'game.html';
});
$("#menu-item-1").click(function() {
    localStorage.setItem("cpuActive", false);
    document.location.href = 'game.html';
});
$("#menu-item-2").click(function() {
    message = 'help';
    on();
});
$("#menu-item-3").click(function() {
    message = 'credits';
    on();
});
// Create grid on home page
function createGrid(){ 
    for (let i=0; i<7200; i++){
    let div = document.createElement("div");
    grid.appendChild(div); 
    }
};
// Identify state variables
let streamOne = [];
let streamTwo = [];
let streamThree = [];
let streamFour = [];
let direction = 60;
let directionTwo = 60;
let directionThree = 60;
let interval;
//Identify constants
let yDirection = 60;
let xDirection = 1;
// Function to color squares
function colorSquares(squares) {
    squares[streamOne[0]].classList.add("streamOne");
    squares[streamTwo[0]].classList.add("streamTwo");
    squares[streamThree[0]].classList.add("streamThree");
    squares[streamFour[0]].classList.add("streamFour");
};
// Function to start stream
function startStream() {
    streamOne.push(380);
    streamTwo.push(745);
    streamThree.push(390);
    streamFour.push(35);
    let squares = document.querySelectorAll(".grid div");
    colorSquares(squares);
    setTimeout(function(){ interval = setInterval(moveStream,110); }, 3500);
    setTimeout(function(){ directionTwo = 1; }, 14000);
    setTimeout(function(){ directionThree = -1; }, 16000);
    setTimeout(function(){ directionTwo = 0; }, 16000);
    setTimeout(function(){ directionThree = 60; }, 18000);
    setTimeout(function(){ directionTwo = 60; }, 1700);
    setTimeout(function(){ direction = 1; }, 16000);
    setTimeout(function(){ clearInterval(interval); }, 22000);
}
// Set a function to continue in intervals
function moveStream() {
    let squares = document.querySelectorAll(".grid div");
    // if (streamFour[0] > 7200) {
    //     clearInterval(interval);
    // } else {
        streamOne.unshift(streamOne[0]+directionThree);
        streamTwo.unshift(streamTwo[0]+direction);
        streamThree.unshift(streamThree[0]+directionTwo);
        streamFour.unshift(streamFour[0]+directionTwo);
        colorSquares(squares);
    //}
};
// On Load execute these functions
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem('cpuActive', false);
    createGrid();
    startStream();
});
// Overlay on and off
function on() {
    popUpOverlay();
    document.getElementById("overlay").style.display = "block";
    editOverlay(overlayMessage(message));
};
function off() {
    document.getElementById("overlay").style.display = "none";
};
function popUpOverlay () {
    $("#overlay-content").animate({
        height: '250px',
        width: '800px',
    },1500)
}
function editOverlay(content) {
    document.querySelector("#overlay-content").innerHTML = `${content}`;
};
function overlayMessage(message){
    if (message === 'help') {
        return '<div class ="message-title">!!!Help!!!</div><div class="message-large">Welcome to the "GRID"! The objective is to out-survive your opponent in the arena by avoiding crashing into walls. You and your opponent extend your own walls as you move forward. Collect glowing squares to get an extra life, lose all your lives and you face permanent deresolution ... <div class="blinking-cursor"></div></div><br><div class="message-small">Press SPACE to Close</div>'
    } else {
        return '<div class ="message-title">!!!Disclaimer!!!</div><div class="message-large">Thank you for playing Tron Lightcycle Battle! This game was created by Vincent Laquindanum without the permission or consent of the Disney franchise. All Tron properties are own by Disney and was not created by Vincent Laquindanum. This game is just for fun and for the sole purpose of finding a job. Please, don\'t sue me ... <div class="blinking-cursor"></div></div><br><div class="message-small">Press SPACE to Close</div>'
    }

};
document.addEventListener("keydown", function(event){
    if(event.code === "Space") {
        off();
        message = "";
    }
})