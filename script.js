/**
 * Logic for the Tic Tac Toe game
 */
//Variables
const dims = [3,3];
const boardState = Array(dims[0] * dims[1]).fill(0)
let currentPlayer = 1;
const allButtons = document.getElementsByClassName('play-btn')
//Initialize the listeners for the 9 ttt buttons(cells)
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
    
    console.log(boardState);
    checkForWin();
    element.disabled = true;
}

function checkForWin() {
    //Horizontal lines
    for (let row = 0; row < dims[0]; row++) {
        const test = [];
        for (let col = 0; col < dims[1]; col++) {
            test.push(boardState[row * dims[1]+col])
        }
        if (test.every(elem => elem === test[0])  && boardState[row*dims[1]] !== 0) {
            console.log('Winner')
        }
    }
    //Vertical lines
    for (let col = 0; col < dims[1]; col++) {
        const test = [];
        for (let row = 0; row < dims[1]; row++) {
            test.push(boardState[row * dims[1]+col])
        }
        if (test.every(elem => elem === test[0])  && boardState[col] !== 0) {
            console.log('Winner')
        }
    }
}