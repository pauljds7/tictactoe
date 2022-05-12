/**
 * Logic for the Tic Tac Toe game
 */
//Variables
const dims = [3,3];
const testing = true;
const boardState = Array(dims[0] * dims[1]).fill(0);
let currentPlayer = 1;
const result = document.getElementById('result');
const playAgain = document.getElementById('play-again');
const allButtons = document.getElementsByClassName('play-btn');
//Initialize the listeners for the 9 tic tac toe buttons(cells)
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click',
        () => {
            onClick(allButtons[i], i+1);
        }
    );
}
//Initialize the listener for play again button
playAgain.addEventListener('click', 
    () => {
        resetGame();
    }
)

function onClick(element, id){
    updateBoard(element, id);
}

function updateAll(fun){
    for (let btn of allButtons) {
        fun(btn);
    }
}

function disableAll(state) {
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

    element.disabled = true;
    checkForEnd()
}

function checkForEnd() {
    winningSquares = checkForWin();
    if (testing) {console.log(boardState);}
    if (testing && winningSquares) {console.log(winningSquares);}

    if (winningSquares) {
        for (let square of winningSquares) {
            allButtons[square].style.border = '2px solid Red';
        }
        result.innerText = "Winner is Player " + (currentPlayer === 2 ? "I with Os" : "II with Xs");
        disableAll(true);
    }
}

function resetGame() {
    currentPlayer = 1;
    for (let i = 0; i < dims[0] * dims[1]; i++) {
        boardState[i] = 0;
    }
    updateAll(btn => {
        btn.innerText = "";
        btn.disabled = false;
        btn.style.border = "1px solid black";
    })
    result.innerText = "";
}

//Check for winning state
function checkForWin() {
    //Horizontal lines
    //Testing works by building separate array of row column values and testing it for universal equality
    for (let row = 0; row < dims[0]; row++) {
        const test = [];
        for (let col = 0; col < dims[1]; col++) {
            const adress = row * dims[1]+col;
            test.push([boardState[adress],adress])
        }
        if (test.every(elem => elem[0] === test[0][0])  && test[0][0] !== 0) {
            return Array.from(test, elem => elem[1])
        }
    }
    //Vertical lines
    //<...>
    for (let col = 0; col < dims[1]; col++) {
        const test = [];
        for (let row = 0; row < dims[1]; row++) {
            const adress = row * dims[1]+col;
            test.push([boardState[adress], adress])
        }
        if (test.every(elem => elem[0] === test[0][0])  && test[0][0] !== 0) {
            return Array.from(test, elem => elem[1])
        }
    }
    //Diagonal lines
    const numDiagonal = dims[1] - dims[0] + 1;
    //Backward diagonals
    for (let diag = 0; diag < numDiagonal; diag++) {
        const test = [];
        for (let elem = 0; elem < dims[0]; elem++) {
            const adress = elem * dims[0] + elem + diag;
            test.push([boardState[adress], adress])
        }
        if (test.every(elem => elem[0] === test[0][0])  && test[0][0] !== 0) {
            return Array.from(test, elem => elem[1])
        }
    }
    //Forward diagonal
    for (let diag = 0; diag < numDiagonal; diag++) {
        const test = [];
        for (let elem = 0; elem < dims[0]; elem++) {
            const adress = elem * dims[0] + dims[1] - elem - 1 - diag;
            test.push([boardState[adress],adress])
        }
        if (test.every(elem => elem[0] === test[0][0])  && test[0][0] !== 0) {
            return Array.from(test, elem => elem[1])
        }
    }
}