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
let playerOneScore;
let playerTwoScore;
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
    playerOneLives = 5;
    playerTwoLives = 5;
    currentPlayerOne.push(240);
    currentPlayerTwo.push(2959);
    direction = 1;
    directionTwo = -1;
    let squares = document.querySelectorAll(".grid div");
    colorSquares(squares);
    //set interval here when ready
    interval = setInterval(moveOutcome,60);
}
// Function for move outcome
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    computer(squares);
    if (checkHits(squares, currentPlayerOne, direction)) {
        playerOneLives -= 1;
        playerTwoScore += 1;
        alert("Blue Derezzed");
        clearInterval(interval);
        checkWinner();
        return 
    } else if (checkHits(squares, currentPlayerTwo, directionTwo)) {
        playerTwoLives -= 1;
        playerOneScore += 1;
        alert("Orange Derezzed");
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
    //set interval here when ready
    interval = setInterval(moveOutcome,60);
};
// Checks for game winner
function checkWinner() {
    if (playerOneLives <= 0) {
        alert("Orange has won!")
    } else if (playerTwoLives <= 0) {
        alert("Blue has won!")
    } else{
        alert("Ready for next round?");
        return round();
    }
};
// Event Listener for controlling direction for player one
document.addEventListener("keydown", 
    function(event) {
        
        if (event.key === 'a') {
            if(Math.abs(direction) !== xDirection) {
                return direction = -xDirection;
            } else {
                return;
            }
        } else if (event.key === 'd') {
            if(Math.abs(direction) !== xDirection) {
                return direction = xDirection;
            } else {
                return;
            }
        } else if (event.key === 'w') {
            if(Math.abs(direction) !== yDirection) {
                return direction = -yDirection;
            } else {
                return;
            }
        } else if (event.key === 's') {
            if(Math.abs(direction) !== yDirection) {
                return direction = yDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowLeft') {
            if(Math.abs(directionTwo) !== xDirection) {
                return directionTwo = -xDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowRight') {
            if(Math.abs(directionTwo) !== xDirection) {
                return directionTwo = xDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowUp') {
            if(Math.abs(directionTwo) !== yDirection) {
                return directionTwo = -yDirection;
            } else {
                return;
            }
        } else if (event.key === 'ArrowDown') {
            if(Math.abs(directionTwo) !== yDirection) {
                return directionTwo = yDirection;
            } else {
                return;
            }
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
    if(Math.floor(Math.random()*100) === 7) {
        if(Math.floor(Math.random()*2) === 0) {
            if(Math.abs(directionTwo) === xDirection) {
                directionTwo = -yDirection
            } else {
                directionTwo = -xDirection
            }
        } else {
            if(Math.abs(directionTwo) === xDirection) {
                directionTwo = -yDirection
            } else {
                directionTwo = xDirection
            }
        }
    } else {
        return
    }
}
document.addEventListener("DOMContentLoaded", function() {
    createBoard();
    startGame();
}
)