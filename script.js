// Document elements used
let grid = document.querySelector(".grid");

// Function to create grid
function createBoard(){ 
    for (let i=0; i<100; i++){
    let div = document.createElement("div") 
    grid.appendChild(div) 
    }
} 

createBoard();