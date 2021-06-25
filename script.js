// Document elements used
let grid = document.querySelector(".grid");
let squares = document.querySelectorAll(".grid div");
// Identify game state variable
let currentPlayerOne = [];
let direction = 0;
// Function to create grid
function createBoard(){ 
    for (let i=0; i<3200; i++){
    let div = document.createElement("div") 
    grid.appendChild(div) 
    }
} ;
// Function to color squares
function colorSquares() {
    squares[currentPlayerOne[0]].classList.add("playerOne");
}
// Function to start game
function startGame(){
    currentPlayerOne = [0];
    direction = 1;
    colorSquares();
    //set interval here when ready

}

// Function to move player
function movePlayer() {

}

// Function for move outcome
function moveOutcome() {

}

// Function to check for hits

createBoard();
startGame();