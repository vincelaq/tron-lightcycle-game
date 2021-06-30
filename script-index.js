// Document elements
let grid = document.querySelector(".grid");
let squares = document.querySelectorAll(".grid div");
// Audio files used
const armory = new Audio('audio/armory.mp3');
const menuItem = new Audio('audio/menu-blip.wav');
const menuSelect = new Audio('audio/menu-select.wav');
// Declared variables
let message;
// Listeners for menu hover
$(`#menu-item-0`).hover(function(){
    $(`#menu-icon-0`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem);
    }, function(){
    $(`#menu-icon-0`).html("");
});
$(`#menu-item-1`).hover(function(){
    $(`#menu-icon-1`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem);
    }, function(){
    $(`#menu-icon-1`).html("");
});
$(`#menu-item-2`).hover(function(){
    $(`#menu-icon-2`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem);
    }, function(){
    $(`#menu-icon-2`).html("");
});
$(`#menu-item-3`).hover(function(){
    $(`#menu-icon-3`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem);
    }, function(){
    $(`#menu-icon-3`).html("");
});
$(`#menu-item-4`).hover(function(){
    $(`#menu-icon-4`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem);
    }, function(){
    $(`#menu-icon-4`).html("");
});
// Listener for click
$("#menu-item-0").click(function() {
    playAudio(menuSelect);
    localStorage.setItem("cpuActive", true);
    document.location.href = 'game.html';
});
$("#menu-item-1").click(function() {
    playAudio(menuSelect);
    localStorage.setItem("cpuActive", false);
    document.location.href = 'game.html';
});
$("#menu-item-2").click(function() {
    playAudio(menuSelect);
    message = 'help';
    on();
});
$("#menu-item-3").click(function() {
    playAudio(menuSelect);
    message = 'credits';
    on();
});
$("#menu-item-4").click(function() {
    playAudio(menuSelect);
    message = 'audio';
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
    setTimeout(function(){ interval = setInterval(moveStream,100); }, 200);

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
    } else {
        clearInterval(interval);
    }
};
// On Load execute these functions
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem('cpuActive', false);
    createGrid();
    startStream();
    playAudio(armory);
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
        return '<div class ="message-title">!!!Help!!!</div><div class="message-large">Welcome to the "GRID"! Your objective is to out-survive your opponent by trapping them with your movement generated walls and collect white boxes for extra lives. When a player has exhausted all of their lives, they face permanent deresolution. <div class="blinking-cursor"></div></div><br><div class="message-small">Press SPACE to Close</div>'
    } else if (message === 'credits') {
        return '<div class ="message-title">!!!Disclaimer!!!</div><div class="message-large">Thank you for playing Tron Lightcycle Battle! This game was created by Vincent Laquindanum without the permission or consent of Disney. All Tron properties used in this game including the Daft Punk OST are own by Disney and was not created by Vincent Laquindanum. This game is just for fun and for the sole purpose of finding a job. Please, don\'t sue me ... <div class="blinking-cursor"></div></div><br><div class="message-small">Press SPACE to Close</div>'
    } else {
        return '<div class ="message-title">!!!Disclaimer!!!</div><div class="message-large">Enabling audio will play menu background music (Armory by Daft Punk from the Tron: Legacy Soundtrack) and in-game sound effects. Would you like to enable audio? (You can toggle audio on and off in-game as well with Y and N)<div class="blinking-cursor"></div></div><br><div class="message-small">Press Y to Enable Sounds<br>Press N to Disable Sounds<br>Press SPACE to Close</div>'
    }
};
document.addEventListener("keydown", function(event){
    if(event.code === "Space") {
        off();
        message = "";
    } else if (event.key === "y") {
        localStorage.setItem("audioActive", true);
        playAudio(armory);
        off();
        message = "";
    } else if (event.key === "n") {
        localStorage.setItem("audioActive", false);
        off();
        armory.pause();
        message = "";
    }
});
function playAudio (sound) {
    if (localStorage.getItem("audioActive") === 'true') {
        sound.play();
    } else {
        return;
    }
};