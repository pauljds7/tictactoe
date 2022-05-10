/**
 * Logic for the Tic Tac Toe game
 */
//Variables
const dims = [3,3];
const testing = true;
const boardState = Array(dims[0] * dims[1]).fill(0)
let currentPlayer = 1;
const allButtons = document.getElementsByClassName('play-btn')
//Initialize the listeners for the 9 tic tac toe buttons(cells)
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click',
        () => {
            onClick(allButtons[i], i+1);
        }
    );
}

function onClick(element, id){
    updateBoard(element, id);
}

function updateAll(state) {
    for (let btn of allButtons) {
        btn.disabled = state;
    }
}

function updateBoard(element, id) {
    if (currentPlayer === 1) {
        element.innerText = 'O';
        boardState[id-1] = 1;
        currentPlayer = 2;
    } else if (currentPlayer === 2) {
        element.innerText = 'X';
        boardState[id-1] = 2;
        currentPlayer = 1;
    }
    
    if (testing) {console.log(boardState);}
    
    checkForWin();
    element.disabled = true;
}

function checkForWin() {
    //Horizontal lines
    //Testing works by building separate array of row column values and testing it for universal equality
    for (let row = 0; row < dims[0]; row++) {
        const test = [];
        for (let col = 0; col < dims[1]; col++) {
            test.push(boardState[row * dims[1]+col])
        }
        if (test.every(elem => elem === test[0])  && test[0] !== 0) {
            console.log('Winner')
        }
    }
    //Vertical lines
    //<...>
    for (let col = 0; col < dims[1]; col++) {
        const test = [];
        for (let row = 0; row < dims[1]; row++) {
            test.push(boardState[row * dims[1]+col])
        }
        if (test.every(elem => elem === test[0])  && test[0] !== 0) {
            console.log('Winner')
        }
    }
    //Diagonal lines
    const numDiagonal = dims[1] - dims[0] + 1;
    //Backward diagonals
    for (let diag = 0; diag < numDiagonal; diag++) {
        const test = [];
        for (let elem = 0; elem < dims[0]; elem++) {
            test.push(boardState[elem * dims[0] + elem + diag])
        }
        if (test.every(elem => elem === test[0])  && test[0] !== 0) {
            console.log('Winner')
        }
    }
    //Forward diagonal
    for (let diag = 0; diag < numDiagonal; diag++) {
        const test = [];
        for (let elem = 0; elem < dims[0]; elem++) {
            test.push(boardState[elem * dims[0] + dims[1] - elem - 1 - diag])
        }
        if (test.every(elem => elem === test[0])  && test[0] !== 0) {
            console.log('Forward diagonal Winner')
        }
    }
}