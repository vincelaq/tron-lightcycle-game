// Document elements used
let grid = document.querySelector(".grid");
// Identify game state variable
let currentPlayerOne = [];
let direction;
let interval;
// Identify game constants
let yDirection = 80;
let xDirection = 1;
// Function to create grid
function createBoard(){ 
    for (let i=0; i<3200; i++){
    let div = document.createElement("div") 
    grid.appendChild(div) 
    }
} ;
// Function to color squares
function colorSquares(squares) {
    squares[currentPlayerOne[0]].classList.add("playerOne");
}
// Function to start game
function startGame(){
    currentPlayerOne.push(0);
    direction = 1;
    let squares = document.querySelectorAll(".grid div");
    colorSquares(squares);
    //set interval here when ready
    interval = setInterval(moveOutcome,100);
}
// Function for move outcome
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkHits(squares)) {
       alert("hit")
        return clearInterval(interval);
    } else {
        movePlayer(squares);
    }
};
// Function to move player
function movePlayer(squares) {
    currentPlayerOne.unshift(currentPlayerOne[0]+direction);
    colorSquares(squares);
}
// Function to check for hits (space taken, bottom wall, )
function checkHits(squares){
    if (squares[currentPlayerOne[0]+direction].classList.contains("playerOne") ||
        (currentPlayerOne[0] + yDirection >=  (yDirection * yDirection) && direction === yDirection) ||
        (currentPlayerOne[0] % yDirection === (yDirection - 1) && direction === 1) ||
        (currentPlayerOne[0] % yDirection === 0 && direction === -1) ||
        (currentPlayerOne[0] - yDirection <= 0 && direction === -yDirection)
    ) {
        return true;
    } else {
        return false;
    }
}
createBoard();
startGame();