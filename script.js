// Document elements used
let grid = document.querySelector(".grid");
// Identify game state variable
let currentPlayerOne = [];
let currentPlayerTwo = [];
let direction;
let directionTwo;
let interval;
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
    currentPlayerOne.push(80);
    currentPlayerTwo.push(3119);
    direction = 1;
    directionTwo = -1;
    let squares = document.querySelectorAll(".grid div");
    colorSquares(squares);
    //set interval here when ready
    interval = setInterval(moveOutcome,100);
}
// Function for move outcome
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkHits(squares, currentPlayerOne, direction)) {
       alert("Blue Derezzed");
        return clearInterval(interval);
    } else if (checkHits(squares, currentPlayerTwo, directionTwo)) {
        alert("Orange Derezzed");
        return clearInterval(interval);
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
// Function to check for hits (space taken, bottom wall, )
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
}
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

createBoard();
startGame();