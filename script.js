// Document elements used
let grid = document.querySelector(".grid");
// Identify game state variable
let currentPlayerOne = [];
let direction;
let interval;
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
// Function to check for hits
function checkHits(squares){
    if (squares[currentPlayerOne[0]+direction].classList.contains("playerOne")) {
        return true;
    } else {
        return false;
    }
}
createBoard();
startGame();