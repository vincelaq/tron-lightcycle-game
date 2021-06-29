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
    for (let i=0; i<4000; i++){
    let div = document.createElement("div");
    grid.appendChild(div); 
    }
};
// Identify state variables
let streamOne = [];
let streamTwo = [];
let streamThree = [];
let streamFour = [];
let streamFive = [];
let direction = 20;
let streamOneOffset = (20*9);
let streamTwoOffset = 5+(20*18);
let streamThreeOffset = 10+(20*9);
let streamFourOffset = 15+(20);
let streamFiveOffset = 7+(20*36);
let interval;
//Identify constants
let yDirection = 20;
let xDirection = 1;
// Function to color squares
function colorSquares(squares) {
    squares[streamOne[0]].classList.add("streamOne");
    squares[streamTwo[0]].classList.add("streamTwo");
    squares[streamThree[0]].classList.add("streamThree");
    squares[streamFour[0]].classList.add("streamFour");
    squares[streamFive[0]].classList.add("streamFive");
};
// Function to start stream
function startStream() {
    streamOne.push(streamOneOffset);
    streamTwo.push(streamTwoOffset);
    streamThree.push(streamThreeOffset);
    streamFour.push(streamFourOffset);
    streamFive.push(streamFiveOffset);
    let squares = document.querySelectorAll(".grid div");
    colorSquares(squares);
    setTimeout(function(){ interval = setInterval(moveStream,100); }, 1000);

}
// Set a function to continue in intervals
function moveStream() {
    let squares = document.querySelectorAll(".grid div");
    if (streamFive[0] < 3980) {
        streamOne.unshift(streamOne[0]+direction);
        streamTwo.unshift(streamTwo[0]+direction);
        streamThree.unshift(streamThree[0]+direction);
        streamFour.unshift(streamFour[0]+direction);
        streamFive.unshift(streamFive[0]+direction);
        squares[streamOne[0]].classList.add("streamOne");
        squares[streamTwo[0]].classList.add("streamTwo");
        squares[streamThree[0]].classList.add("streamThree");
        squares[streamFour[0]].classList.add("streamFour");
        squares[streamFive[0]].classList.add("streamFive");  
    } else if (streamTwo[0] < 3980) {
        streamOne.unshift(streamOne[0]+direction);
        streamTwo.unshift(streamTwo[0]+direction);
        streamThree.unshift(streamThree[0]+direction);
        streamFour.unshift(streamFour[0]+direction);
        squares[streamOne[0]].classList.add("streamOne");
        squares[streamTwo[0]].classList.add("streamTwo");
        squares[streamThree[0]].classList.add("streamThree");
        squares[streamFour[0]].classList.add("streamFour");
    } else if (streamOne[0] < 3980) {
        streamOne.unshift(streamOne[0]+direction);
        streamThree.unshift(streamThree[0]+direction);
        streamFour.unshift(streamFour[0]+direction); 
        squares[streamOne[0]].classList.add("streamOne");
        squares[streamThree[0]].classList.add("streamThree");
        squares[streamFour[0]].classList.add("streamFour");
    } else if (streamFour[0] < 3980) {
        streamFour.unshift(streamFour[0]+direction);
        squares[streamFour[0]].classList.add("streamFour");
    }
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
        return '<div class ="message-title">!!!Help!!!</div><div class="message-large">Welcome to the "GRID"! The objective is to out-survive your opponent by trapping them with your movement generated walls and collecting white boxes for extra lives. When a player has exhausted all of their lives, they face permanent deresolution. Win and the player lives to battle on ... <div class="blinking-cursor"></div></div><br><div class="message-small">Press SPACE to Close</div>'
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