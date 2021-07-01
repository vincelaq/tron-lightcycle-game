// Document elements
let grid = document.querySelector(".grid");
let squares = document.querySelectorAll(".grid div");
// Audio files used
const armory = new Audio('audio/armory.mp3');
const menuItem = new Audio('audio/menu-item-2.wav');
const menuSelect = new Audio('audio/menu-select.wav');
// Declared variables
let message;
// Listeners for menu hover
$(`#menu-item-0`).hover(function(){
    $(`#menu-icon-0`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem, 'sound');
    }, function(){
    $(`#menu-icon-0`).html("");
});
$(`#menu-item-1`).hover(function(){
    $(`#menu-icon-1`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem, 'sound');
    }, function(){
    $(`#menu-icon-1`).html("");
});
$(`#menu-item-2`).hover(function(){
    $(`#menu-icon-2`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem, 'sound');
    }, function(){
    $(`#menu-icon-2`).html("");
});
$(`#menu-item-3`).hover(function(){
    $(`#menu-icon-3`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem, 'sound');
    }, function(){
    $(`#menu-icon-3`).html("");
});
$(`#menu-item-4`).hover(function(){
    $(`#menu-icon-4`).html('<img class="selection-icon" src="images/blue-disc.png">');
    playAudio(menuItem, 'sound');
    }, function(){
    $(`#menu-icon-4`).html("");
});
// Listener for click
$("#menu-item-0").click(function() {
    playAudio(menuSelect, 'sound');
    localStorage.setItem("cpuActive", true);
    document.location.href = 'game.html';
});
$("#menu-item-1").click(function() {
    playAudio(menuSelect, 'sound');
    localStorage.setItem("cpuActive", false);
    document.location.href = 'game.html';
});
$("#menu-item-2").click(function() {
    playAudio(menuSelect, 'sound');
    message = 'help';
    on();
});
$("#menu-item-3").click(function() {
    playAudio(menuSelect, 'sound');
    message = 'credits';
    on();
});
$("#menu-item-4").click(function() {
    playAudio(menuSelect, 'sound');
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
    playAudio(armory, 'music');
});
// Overlay on and off
function on() {

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
        return '<div class ="message-title">!!!How to Play!!!</div><div class="message-large">Welcome to the "GRID"! <br>Your objective is to out-survive your opponent by trapping them with your movement generated walls and collect white boxes ( <div id="white-box"></div> ) for extra lives. When a player has exhausted all of their lives, they face permanent deresolution. <div class="blinking-cursor"></div></div><br><div id="controller-name"><div>Player 1 Controls</div><div>Player 2 Controls</div></div><br><div id="controls-container"><div id="player-one-controls" class="controls"><div id="break" class="button-border"></div><div id="w" class="button-border"><div class="button">W</div></div><div id="break" class="button-border"></div><div id="a" class="button-border"><div class="button">A</div></div><div id="s" class="button-border"><div class="button">S</div></div><div id="d" class="button-border"><div class="button">D</div></div></div><div id="player-two-controls" class="controls"><div id="break" class="button-border"></div><div id="up" class="button-border"><div class="button">⇡</div></div><div id="break" class="button-border"></div><div id="left" class="button-border"><div class="button">⇠</div></div><div id="down" class="button-border"><div class="button">⇣</div></div><div id="right" class="button-border"><div class="button">⇢</div></div></div></div><div class="message-small">Press SPACE to Close</div>'
    } else if (message === 'credits') {
        return '<div class ="message-title">!!!Disclaimer!!!</div><div class="message-large">Thank you for playing Tron Lightcycle Battle! <br><br>This game was created by Vincent Laquindanum and does not claim to own Tron properties. All Tron properties used in this game including the Daft Punk OST are own by Disney and was not created by Vincent Laquindanum. This game is just for fun and for the sole purpose of finding a job. Please, don\'t sue me ... <div class="blinking-cursor"></div></div><br><div class="message-small">Press SPACE to Close</div>'
    } else {
        return '<div class ="message-title">!!!Disclaimer!!!</div><div class="message-large">Enabling audio will play background music and in-game sound effects. These options can be toggled in-game as well.<div class="blinking-cursor"></div></div><br><div class="message-small">Press ] to Enable All Sounds<br>Press [ to Disable All Sounds<br>Press + to Toggle Music On<br>Press - to Toggle Music Off<br>Press 0 to Toggle Sound FX On<br>Press 9 to Toggle Sound FX Off<br>Press SPACE to Close</div>'
    }
};
document.addEventListener("keydown", function(event){
    if(event.code === "Space") {
        off();
        message = "";
    } else if (event.key === "]") {
        localStorage.setItem("soundActive", true);
        localStorage.setItem("musicActive", true);
        playAudio(armory, 'music');
        off();
        message = "";
        audioCheck();
    } else if (event.key === "[") {
        localStorage.setItem("soundActive", false);
        localStorage.setItem("musicActive", false);
        off();
        armory.pause();
        message = "";
        audioCheck();
    } else if (event.key === "=") {
        localStorage.setItem("musicActive", true);
        off();
        playAudio(armory, 'music');
        message = "";
        audioCheck();
    } else if (event.key === "-") {
        localStorage.setItem("musicActive", false);
        off();
        armory.pause();
        message = "";
        audioCheck();
    }  else if (event.key === "0") {
        localStorage.setItem("soundActive", true);
        off();
        message = "";
        audioCheck();
    } else if (event.key === "9") {
        localStorage.setItem("soundActive", false);
        off();
        message = "";
        audioCheck();
    }
});
function playAudio (sound, type) {
    if (localStorage.getItem("musicActive") === 'true' && type === 'music') {
        sound.play();
    } else if (localStorage.getItem("soundActive") === 'true' && type === 'sound') {
        sound.play();
    } else {
        return;
    }
};
function audioCheck () {
    if (localStorage.getItem("musicActive") === 'true' || localStorage.getItem("soundActive") === 'true') {
        $("#menu-item-4").html("AUDIO ON");
    } else {
        $("#menu-item-4").html("AUDIO OFF");
    }
};