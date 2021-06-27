// Document elements used
let grid = document.querySelector(".grid");
let squares = document.querySelectorAll(".grid div");
// Identify game state variable
let currentPlayerOne = [];
let currentPlayerTwo = [];
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
let yDirection = 80;
let xDirection = 1;
// Function to create grid
function createBoard(){ 
    for (let i=0; i<3200; i++){
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
    currentPlayerOne.push(240);
    currentPlayerTwo.push(2959);
    direction = 1;
    directionTwo = -1;
    let squares = document.querySelectorAll(".grid div");
    colorSquares(squares);
    updateStats();
    on();
    //interval = setInterval(moveOutcome,60);
}
// Function for move outcome
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (cpuActive === true) {
        computer(squares)
    };
    if (checkHits(squares, currentPlayerOne, direction)) {
        playerOneLives -= 1;
        playerTwoScore += 1;
        gameStatus = 'roundOrange';
        //alert("Blue Derezzed");
        clearInterval(interval);
        checkWinner();
        return 
    } else if (checkHits(squares, currentPlayerTwo, directionTwo)) {
        playerTwoLives -= 1;
        playerOneScore += 1;
        gameStatus = 'roundBlue';
        //alert("Orange Derezzed");
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
    if ((player[0] + yDirection >=  (yDirection * 40) && playerDirection === yDirection) ||
        (player[0] % yDirection === (yDirection - 1) && playerDirection === xDirection) ||
        (player[0] % yDirection === 0 && playerDirection === -xDirection) ||
        (player[0] - yDirection <= 0 && playerDirection === -yDirection) ||
        squares[player[0]+playerDirection].classList.contains("playerOne") ||
        squares[player[0]+playerDirection].classList.contains("playerTwo")) {
            return true;
        } else {
            return false;
    };
};
// Sets Round Function
function round(){
    currentPlayerOne = [];
    currentPlayerTwo = [];
    let squares = document.querySelectorAll(".grid div");
    for (let i=0; i<3200; i++){
        squares[i].classList.remove("playerOne","playerTwo")
    };
    currentPlayerOne.push(240);
    currentPlayerTwo.push(2959);
    direction = 1;
    directionTwo = -1;
    colorSquares(squares);
    updateStats();
    on();
    //interval = setInterval(moveOutcome,60);
};
// Checks for game winner
function checkWinner() {
    if (playerOneLives <= 0) {
        gameStatus = 'orangeWinner';
        on();
        //alert("Orange has won!")
    } else if (playerTwoLives <= 0) {
        gameStatus = 'blueWinner';
        on();
        //alert("Blue has won!")
    } else{
        //alert("Ready for next round?");
        return round();
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
        } else if (event.key === 'Enter' && document.getElementById("overlay").style.display === "block" && gameStatus !== 'blueWinner' && gameStatus !== 'orangeWinner') {
            if (gameStatus === 'start') {
                interval = setInterval(moveOutcome,60);
                off();               
            } else if (gameStatus === 'roundBlue' || gameStatus === 'roundOrange') {
                interval = setInterval(moveOutcome,60);
                off();
            } else {
                off();
            }
        } else if (event.key === 'Shift') {
            document.location.href = 'index.html';
        } else if (event.key === 'Backspace') {
            reinitialize();
            startGame();
        } 
});
// Computer AI logic
function computer() {
    let squares = document.querySelectorAll(".grid div");
    if (directionTwo === xDirection) {
        if ((currentPlayerTwo[0]+3) % yDirection === (yDirection -1) || squares[currentPlayerTwo[0]+3].classList.contains("playerOne") || squares[currentPlayerTwo[0]+3].classList.contains("playerTwo")) {
            if((currentPlayerTwo[0]+(320)) >= (yDirection * 40) || squares[currentPlayerTwo[0]+(160)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(160)].classList.contains("playerTwo")) {
                directionTwo = -yDirection;
            } else {
                directionTwo = yDirection;
            }
        }
    } else if (directionTwo === -xDirection){
        if ((currentPlayerTwo[0]-3) % yDirection === 0 || squares[currentPlayerTwo[0]-3].classList.contains("playerOne") || squares[currentPlayerTwo[0]-3].classList.contains("playerTwo")) {
            if((currentPlayerTwo[0]+(320)) >= (yDirection * 40) || squares[currentPlayerTwo[0]+(160)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(160)].classList.contains("playerTwo")) {
                directionTwo = -yDirection;
            } else {
                directionTwo = yDirection;
            }
        }
    } else if(directionTwo === yDirection) {
        if ((currentPlayerTwo[0]+(320)) + yDirection >= (yDirection *40) || squares[currentPlayerTwo[0]+(240)].classList.contains("playerOne") || squares[currentPlayerTwo[0]+(240)].classList.contains("playerTwo")) {
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
    }
    // Adding random factor to AI
    if(Math.floor(Math.random()*150) === 7) {
        if(Math.floor(Math.random()*2) === 0) {
            if(Math.abs(directionTwo) === xDirection) {
                directionTwo = -yDirection
            } else {
                directionTwo = -xDirection
            }
        } else {
            if(Math.abs(directionTwo) === xDirection) {
                directionTwo = yDirection
            } else {
                directionTwo = xDirection
            }
        }
    } else {
        return
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
        twoLives.innerHTML += '<img class="image-lives" src="images/orange-disc.png" />';
    }
}
// Overlay on and off function and edit text in overlay
function on() {
    popUpOverlay();
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
        popUpOverlay();
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large">Grid lightcycle.exe boot up sequence complete...<div class="blinking-cursor"></div></div><br><div class="message-small">Press ENTER to Start <br><br> Press SHIFT to go to Menu</div>'
    } else if (status === 'roundBlue') {
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><span class="player-one-name">Player 1</span> wins round! <span class="player-two-name">Player 2</span> derezzed! ...<div class="blinking-cursor"></div></div><br><div class="message-small">Press ENTER for Next Round <br><br> Press SHIFT to go to Menu</div>';
    } else if (status === 'roundOrange') {
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><span class="player-two-name">Player 2</span> wins round! <span class="player-one-name">Player 1</span> derezzed! ...<div class="blinking-cursor"></div></div><br><div class="message-small">Press ENTER for Next Round <br><br> Press SHIFT to go to Menu</div>';
    } else if (status === 'blueWinner') {
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><br><span class="player-one-name">Player 1</span> wins! ...<div class="blinking-cursor"></div></div><br><br><div class="message-small">Press BACKSPACE for New Game <br><br>Press SHIFT to go to Menu</div>';
    } else if (status === 'orangeWinner') {
        return '<div class ="message-title">!!!Alert!!!</div><div class="message-large"><br><span class="player-two-name">Player 2</span> wins! ...<div class="blinking-cursor"></div></div><br><br><div class="message-small">Press BACKSPACE for New Game <br><br>Press SHIFT to go to Menu</div>';
    }
};
// On page load event listener
document.addEventListener("DOMContentLoaded", function() {
    createBoard();
    startGame();
}
);
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
    for (let i=0; i<3200; i++){
        squares[i].classList.remove("playerOne","playerTwo")
    };
};
// Function animate overlay
function popUpOverlay () {
    $("#overlay-content").animate({
        height: '250px',
        width: '800px',
    },1500)
}
// Function to delay anything when needed
function delay() {
    setTimeout(function(){}, 10000);
};