// Document elements
let grid = document.querySelector(".grid");
let squares = document.querySelectorAll(".grid div");
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
