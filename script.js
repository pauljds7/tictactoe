/**
 * Logic for the Tic Tac Toe game
 */

//Initialize the listeners for the 9 ttt buttons(cells)
for (let i = 1; i <= 9; i++) {
    document.getElementById(i).addEventListener('click',
        () => {
            onClick(i);
        }
    );
}


function onClick(id){
    element = document.getElementById(id);
    element.innerText = 'Hello';
}
