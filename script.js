// Document elements used
let grid = document.querySelector(".grid");
let squares = document.querySelectorAll(".grid div");
// Audio files and effects
const extraLife = new Audio('audio/extra-life.wav');
const crash = new Audio('audio/short-explosion-2.wav');
const winner = new Audio('audio/achievement-1.wav');
const loser = new Audio('audio/lose-1.wav');
const encom = new Audio('audio/encom-2.mp3');
const disc = new Audio('audio/disc-wars.mp3');
const end = new Audio('audio/end-titles.mp3');
// Identify game state variable
let currentPlayerOne = [];
let currentPlayerTwo = [];
let currentLife = [];
let direction;
let directionTwo;
let interval;
let playerOneLives;
let playerTwoLives;
let playerOneScore = 0;
let playerTwoScore = 0;
let gameStatus = 'start';
let cpuActive = localStorage.getItem("cpuActive");
// Identify game constants
let yDirection = 160;
let xDirection = 1;
// On page load event listener
document.addEventListener("DOMContentLoaded", function() {
    createBoard();
    startGame();
    playAudio(disc, 'music');
});
// Function to create grid
function createBoard(){ 
    for (let i=0; i<12800; i++){
    let div = document.createElement("div");
    grid.appendChild(div); 
    }
} ;
// Function to color squares
function colorSquares(squares) {
    squares[currentPlayerOne[0]].classList.add("playerOne");
    squares[currentPlayerTwo[0]].classList.add("playerTwo");
}
// Function to start game
function startGame(){
    gameStatus = 'start';
    playerOneLives = 5;
    playerTwoLives = 5;
    currentPlayerOne.push(800);
    currentPlayerTwo.push(11999);
    direction = 1;
    directionTwo = -1;
    let squares = document.querySelectorAll(".grid div");
    colorSquares(squares);
    updateStats();
    on();
}
// Function for move outcome
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (cpuActive === 'true') {
        computer();
    }
    if (checkHits(squares, currentPlayerOne, direction)) {
        playerOneLives -= 1;
        playerTwoScore += 1;
        gameStatus = 'roundOrange';
        clearInterval(interval);
        checkWinner();
        return 
    } else if (checkHits(squares, currentPlayerTwo, directionTwo)) {
        playerTwoLives -= 1;
        playerOneScore += 1;
        gameStatus = 'roundBlue';
        clearInterval(interval);
        checkWinner();
        return 
    } else {
        movePlayer(squares);
    }
};
// Function to move player
function movePlayer(squares) {
    currentPlayerOne.unshift(currentPlayerOne[0]+direction);
    currentPlayerTwo.unshift(currentPlayerTwo[0]+directionTwo);
    colorSquares(squares);
}
// Function to check for hits (bottom wall,  )
function checkHits(squares, player, playerDirection){
    if ((player[0] + yDirection >=  (yDirection * 80) && playerDirection === yDirection) || // Bottom wall hit
        (player[0] % yDirection === (yDirection - 1) && playerDirection === xDirection) || // Right wall hit
        (player[0] % yDirection === 0 && playerDirection === -xDirection) || // Left wall hit
        (player[0] - yDirection <= 0 && playerDirection === -yDirection) || // Top wall hit
        (player === currentPlayerOne && squares[player[0]+playerDirection].classList.contains("playerOne")) || 
        (player === currentPlayerTwo && squares[player[0]+playerDirection].classList.contains("playerTwo")) || 
        (player === currentPlayerOne && squares[player[0]].classList.contains("playerTwo")) ||
        (player === currentPlayerTwo && squares[player[0]].classList.contains("playerOne"))) {
            playAudio(crash, 'sound');
            return true;
    } else {
        if (squares[player[0]+playerDirection].classList.contains("lifeUp")){
            if (player === currentPlayerOne) {
                squares[player[0]+playerDirection].classList.remove("lifeUp")
                playerOneLives ++;
                playAudio(extraLife, 'sound');
                updateStats();
            } else if (player === currentPlayerTwo) {
                squares[player[0]+playerDirection].classList.remove("lifeUp")
                playerTwoLives ++;
                playAudio(extraLife, 'sound');
                updateStats();
            }
        }
        return false;
    };
};
// Sets Round Function
function round(){
    currentPlayerOne = [];
    currentPlayerTwo = [];
    currentLife = [];
    let squares = document.querySelectorAll(".grid div");
    for (let i=0; i<12800; i++){
        squares[i].classList.remove("playerOne","playerTwo","lifeUp")
    };
    currentPlayerOne.push(800);
    currentPlayerTwo.push(11999);
    direction = 1;
    directionTwo = -1;
    if (lifeDecider()) {
        putLifeWhere();
    };
    colorSquares(squares);
    updateStats();
    on();
};
// Checks for game winner
function checkWinner() {
    if (playerOneLives <= 0) {
        gameStatus = 'orangeWinner';
        on();
    } else if (playerTwoLives <= 0) {
        gameStatus = 'blueWinner';
        on();
    } else{
        return round();
    }
};
// Function to decide if an extra life will be generated
function lifeDecider() {
    if(Math.floor(Math.random()* 2) === 1) {
        return true;
    } else {
        return false
    }
};
// Function to decide where to put the extra life
function putLifeWhere() {
    let squares = document.querySelectorAll(".grid div");
    let gridNumber = Math.floor(Math.random()*12800);
   if (gridNumber === 800 || gridNumber === 11999) {
        gridNumber += 160;
        currentLife.push(gridNumber);
        squares[currentLife[0]].classList.add("lifeUp")
   } else {
        currentLife.push(gridNumber);
        squares[currentLife[0]].classList.add("lifeUp")
   }
};
// Event Listener for controlling direction for player one
document.addEventListener("keydown", 
    function(event) {
        
        if (event.key === 'a') {
            if(Math.abs(direction) !== xDirection && document.getElementById("overlay").style.display === "none") {
                return direction = -xDirection;
            } else {
                return;
            }
        } else if (event.key === 'd') {
            if(Math.abs(direction) !== xDirection && document.getElementById("overlay").style.display === "none") {
                return direction = xDirection;
            } else {
                return;
            }
        } else if (event.key === 'w') {
            if(Math.abs(direction) !== yDirection && document.getElementById("overlay").style.display === "none") {
                return direction = -yDirection;
            } else {
                return;
            }
        } else if (event.key === 's') {
            if(Math.abs(direction) !== yDirection && document.getElementById("overlay").style.display === "none") {
                return direction = yDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowLeft') {
            if(Math.abs(directionTwo) !== xDirection && document.getElementById("overlay").style.display === "none") {
                return directionTwo = -xDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowRight') {
            if(Math.abs(directionTwo) !== xDirection && document.getElementById("overlay").style.display === "none") {
                return directionTwo = xDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowUp' && document.getElementById("overlay").style.display === "none") {
            if(Math.abs(directionTwo) !== yDirection) {
                return directionTwo = -yDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowDown' && document.getElementById("overlay").style.display === "none") {
            if(Math.abs(directionTwo) !== yDirection) {
                return directionTwo = yDirection;
            } else {
                return;
            }
        } else if (event.code === 'Space' && document.getElementById("overlay").style.display === "block" && gameStatus !== 'blueWinner' && gameStatus !== 'orangeWinner') {
            if (gameStatus === 'start') {
                interval = setInterval(moveOutcome,40);
                off();               
            } else if (gameStatus === 'roundBlue' || gameStatus === 'roundOrange') {
                interval = setInterval(moveOutcome,40);
                off();
            } else {
                off();
            }
        } else if (event.key === 'Shift') {
            document.location.href = 'index.html';
        } else if (event.key === 'Backspace') {
            reinitialize();
            startGame();
        } else if (event.key === "]") {
            localStorage.setItem("soundActive", true);
            localStorage.setItem("musicActive", true);
            playAudio(encom, 'music');
        } else if (event.key === "[") {
            localStorage.setItem("soundActive", false);
            localStorage.setItem("musicActive", false);
            encom.pause();
            disc.pause();
            end.pause();
        } else if (event.key === "=") {
            localStorage.setItem("musicActive", true);
            playAudio(encom, 'music');
        } else if (event.key === "-") {
            localStorage.setItem("musicActive", false);
            encom.pause();
            disc.pause();
            end.pause();
        }  else if (event.key === "0") {
            localStorage.setItem("soundActive", true);
        } else if (event.key === "9") {
            localStorage.setItem("soundActive", false);
            message = "";
            audioCheck();
        } else if (event.key === '1') {
            disc.pause();
            end.pause();
            playAudio(encom, 'music');
        } else if (event.key === '2') {
            encom.pause();
            disc.pause()
            playAudio(end, 'music');
        } else if (event.key === '3') {
            encom.pause();
            end.pause();
            playAudio(disc, 'music');
        }
});
// Computer AI logic
function computer() {
    let squares = document.querySelectorAll(".grid div");
    if (directionTwo === xDirection) {
        if ((currentPlayerTwo[0]+3) % yDirection === (yDirection -1) || squares[currentPlayerTwo[0]+3].classList.contains("playerOne") || squares[currentPlayerTwo[0]+3].classList.contains("playerTwo")) {
            if((currentPlayerTwo[0]+(480)) >= (yDirection * 80) || squares[currentPlayerTwo[0]+(160)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(160)].classList.contains("playerTwo")) {
                directionTwo = -yDirection;
            } else {
                directionTwo = yDirection;
            }
        }
    } else if (directionTwo === -xDirection){
        if ((currentPlayerTwo[0]-3) % yDirection === 0 || squares[currentPlayerTwo[0]-3].classList.contains("playerOne") || squares[currentPlayerTwo[0]-3].classList.contains("playerTwo")) {
            if((currentPlayerTwo[0]+(320)) >= (yDirection * 80) || squares[currentPlayerTwo[0]+(160)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(160)].classList.contains("playerTwo")) {
                directionTwo = -yDirection;
            } else {
                directionTwo = yDirection;
            }
        }
    } else if(directionTwo === yDirection) {
        if ((currentPlayerTwo[0]+(320)) + yDirection >= (yDirection * 80) || squares[currentPlayerTwo[0]+(240)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(240)].classList.contains("playerTwo")) {
            if((currentPlayerTwo[0]+(3)) % yDirection === (yDirection -1) || squares[currentPlayerTwo[0]+(3)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(3)].classList.contains("playerTwo")) {
                directionTwo = -xDirection;
            } else {
                directionTwo = xDirection;
            }
        }
    } else if(directionTwo === -yDirection) {
        if ((currentPlayerTwo[0]-(320)) - yDirection <= 0 || squares[currentPlayerTwo[0]-(240)].classList.contains("playerOne") || squares[currentPlayerTwo[0]-(240)].classList.contains("playerTwo")) {
            if((currentPlayerTwo[0]+(3)) % yDirection === (yDirection -1) || squares[currentPlayerTwo[0]+(3)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(3)].classList.contains("playerTwo")) {
                directionTwo = -xDirection;
            } else {
                directionTwo = xDirection;
            }
        }
    // }
    // // Adding random factor to AI
    // if(Math.floor(Math.random()*150) === 7) {
    //     if(Math.floor(Math.random()*2) === 0) {
    //         if(Math.abs(directionTwo) === xDirection) {
    //             directionTwo = -yDirection
    //         } else {
    //             directionTwo = -xDirection
    //         }
    //     } else {
    //         if(Math.abs(directionTwo) === xDirection) {
    //             directionTwo = yDirection
    //         } else {
    //             directionTwo = xDirection
    //         }
    //     }
    } else {
        return;
    }
}
function updateStats() {
    let oneLives = document.querySelector("#player-one-lives");
    let twoLives = document.querySelector("#player-two-lives");
    let oneScore = document.querySelector("#player-one-score");
    let twoScore = document.querySelector("#player-two-score");
    oneScore.textContent = playerOneScore;
    twoScore.textContent = playerTwoScore;
    oneLives.innerHTML = "";
    twoLives.innerHTML = "";
    for (let i=0; i<playerOneLives; i++) {
        oneLives.innerHTML += '<img class="image-lives" src="images/blue-disc.png" />';
    }
    for (let i=0; i<playerTwoLives; i++) {
        twoLives.innerHTML += '<img class="image-lives" src="images/red-disc.png" />';
    }
}
// Overlay on and off function and edit text in overlay
function on() {
    document.getElementById("overlay").style.display = "block";
    editOverlay(overlayMessage(gameStatus));
};
function off() {
    document.getElementById("overlay").style.display = "none";
};
function editOverlay(content) {
    document.querySelector("#overlay-content").innerHTML = `${content}`;
};
function overlayMessage(status) {
    if (status === 'start') {
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large">Grid lightcycle.exe load complete. Program resolution complete. <br>User ready?...<div class="blinking-cursor"></div></div><br><div class="message-small">Press <span class="overlay-key">SPACE</span> to Start <br><br> Press <span class="overlay-key">SHIFT</span> to go to Menu</div>'
    } else if (status === 'roundBlue') {
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><span class="player-one-name">Player 1</span> wins round! <div class="blinking-cursor"></div></div><br><div class="message-small">Press <span class="overlay-key">SPACE</span> for Next Round <br><br> Press <span class="overlay-key">SHIFT</span> to go to Menu</div>';
    } else if (status === 'roundOrange') {
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><span class="player-two-name">Player 2</span> wins round! <div class="blinking-cursor"></div></div><br><div class="message-small">Press <span class="overlay-key">SPACE</span> for Next Round <br><br> Press <span class="overlay-key">SHIFT</span> to go to Menu</div>';
    } else if (status === 'blueWinner') {
        playAudio(winner, 'sound');
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><br><span class="player-one-name">Player 1</span> WINS! <br><br>Play again?<div class="blinking-cursor"></div></div><br><div class="message-small">Press <span class="overlay-key">BACKSPACE</span> for New Game <br><br>Press <span class="overlay-key">SHIFT</span> to go to Menu</div>';
    } else if (status === 'orangeWinner') {
        if(cpuActive === 'true'){
            playAudio(loser, 'sound');
        } else if(cpuActive === 'false') {
            playAudio(winner, 'sound');
        }
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><br><span class="player-two-name">Player 2</span> WINS! <br><br>Play again?<div class="blinking-cursor"></div></div><br><div class="message-small">Press <span class="overlay-key">BACKSPACE</span> for New Game <br><br>Press <span class="overlay-key">SHIFT</span> to go to Menu</div>';
    }
};
// Function to clear game state
function reinitialize() {
    currentPlayerOne = [];
    currentPlayerTwo = [];
    direction;
    directionTwo;
    interval;
    playerOneLives;
    playerTwoLives;
    playerOneScore = 0;
    playerTwoScore = 0;
    gameStatus = 'start';
    let squares = document.querySelectorAll(".grid div");
    for (let i=0; i<12800; i++){
        squares[i].classList.remove("playerOne","playerTwo")
    };
};
function playAudio (sound, type) {
    if (localStorage.getItem("musicActive") === 'true' && type === 'music') {
        sound.play();
    } else if (localStorage.getItem("soundActive") === 'true' && type === 'sound') {
        sound.play();
    } else {
        return;
    }
};
