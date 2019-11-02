//-----------------CONST and VAR-------------------
var height , width , mineCount , column , row , board , bombPercentage , bombArray , bombRandom , newDiv , allDivs , logo , menu , size , difficulty , play , container , reset , refresh , new_column ;

//-------------------CACHED-----------------------
//Variable for bomb count / random location for bomb / store the bomb location / a div to store all other divs / 

bombArray = []
logo = document.querySelector(".logo")
menu = document.querySelector(".menu")

size = document.getElementById('select');
difficulty = document.getElementById('difficulty');

play = document.getElementById('play')

container = document.querySelector('.container');
reset = document.querySelector('.reset')
refresh = document.querySelector('.refresh')

allDivs = document.createElement('div').classList.add('Alldivs')

//------------------EVENT LISTENER-----------------
// Need to have play/reset/refresh/cell buttons
container.addEventListener('click' , clickHandler);

play.addEventListener('click', playHandler)

reset.addEventListener('click' , init)
refresh.addEventListener('click' , playHandler)

//--------------------FUNCTION---------------------
//Need function to run the buttons
//Need function to eliminate the empety cells sorounding the clicked cell
//Need function to reset the game

//size
function playHandler(){
    menu.style.display = 'none'
    logo.style.display = 'none'
    bombArray = []
    if (document.querySelector('.allDivs')) document.querySelector('.allDivs').remove()
    allDivs = document.createElement('div')
    allDivs.classList.add('allDivs')
    container.appendChild(allDivs)
    
    if(size.value === 'Small'){
        column = 10
        row = 10
    }else if (size.value === 'Medium' ){
        column = 25
        row = 20
    }else {
        column = 40 
        row = 25
    }
    //difficulty
    if(difficulty.value === 'Easy'){
        bombPercentage = (column*row)*0.1
    }else if (difficulty.value === 'Medium' ){
        bombPercentage = (column*row)*0.2
    }else {
        bombPercentage = (column*row)*0.3
    }
    allDivs.style["grid-template-columns"] = `repeat(${column}, 31px)`;
    allDivs.style["grid-template-row"] = `repeat(${row}, 31px)`;
    //setting the board
    board = new Array((column*row) -1).fill(0);
    for (i=0 ; i < bombPercentage ; i++){
        bombRandom = Math.floor(Math.random()*(column*row))
        bombArray.push(bombRandom);
        board.splice(bombArray[i] , 1 , -1);
    }
    render()
}
//box click
function clickHandler(evt){
    if(board[evt.target.id] !== -1){
        if(board[parseInt(evt.target.id) + 1] || board[parseInt(evt.target.id) - column + 1] || board[parseInt(evt.target.id) - column] || board[parseInt(evt.target.id) - column - 1] || board[parseInt(evt.target.id) - 1] || board[parseInt(evt.target.id) + column - 1] || board[parseInt(evt.target.id) + column] || board[parseInt(evt.target.id) + column + 1] ){
            evt.target.textContent = (board[parseInt(evt.target.id) + 1]) + (board[parseInt(evt.target.id) - column + 1]) + (board[parseInt(evt.target.id) - column ]) + (board[parseInt(evt.target.id) - column - 1]) + (board[parseInt(evt.target.id) - 1]) + (board[parseInt(evt.target.id) + column - 1]) + (board[parseInt(evt.target.id) + column]) + (board[parseInt(evt.target.id) + column + 1])
        }
        diagonalUpR = parseInt(evt.target.id);
        diagonalDownR = parseInt(evt.target.id);
        diagonalUpL = parseInt(evt.target.id);
        diagonalDownL = parseInt(evt.target.id);
        columnUp = parseInt(evt.target.id);
        columnDown = parseInt(evt.target.id);
        upR = 0;
        downR = 0;
        upL = 0;
        downL = 0;
        while (!bombArray.includes(diagonalUpR) && upR <= 48 && document.getElementById(diagonalUpR)){
            console.log(!bombArray.includes(diagonalUpR))
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp)){
                document.getElementById(columnUp).style.backgroundColor = 'green'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown)){
                document.getElementById(columnDown).style.backgroundColor = 'green'
                columnDown += column;
            }

            document.getElementById(diagonalUpR).style.backgroundColor = 'green'
            diagonalUpR -= (column -1);

            columnUp = diagonalUpR;
            columnDown = diagonalUpR;
            upR += 1
        }
        //
        while (!bombArray.includes(diagonalDownR) && downR <= 48 && document.getElementById(diagonalDownR)){
            console.log(upR)
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp)){
                document.getElementById(columnUp).style.backgroundColor = 'yellow'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown)){
                document.getElementById(columnDown).style.backgroundColor = 'yellow'
                columnDown += column;
            }
            document.getElementById(diagonalDownR).style.backgroundColor = 'yellow'
            diagonalDownR += (column +1)
            columnUp = diagonalDownR;
            columnDown = diagonalDownR;
            downR += 1
        }
        while (!bombArray.includes(diagonalUpL) && upL <= 48 && document.getElementById(diagonalUpL)){
            console.log(upR)
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp)){
                document.getElementById(columnUp).style.backgroundColor = 'purple'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown)){
                document.getElementById(columnDown).style.backgroundColor = 'purple'
                columnDown += column;
            }
            document.getElementById(diagonalUpL).style.backgroundColor = 'purple'
            diagonalUpL -= (column +1)
            columnUp = diagonalUpL;
            columnDown = diagonalUpL;
            upL += 1
        }
        while (!bombArray.includes(diagonalDownL) && downL <= 48 && document.getElementById(diagonalDownL)){
            console.log(upR)
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp)){
                document.getElementById(columnUp).style.backgroundColor = 'orange'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown)){
                document.getElementById(columnDown).style.backgroundColor = 'orange'
                columnDown += column;
            }
            document.getElementById(diagonalDownL).style.backgroundColor = 'orange'
            diagonalDownL += (column -1)
            columnUp = diagonalDownL;
            columnDown = diagonalDownL;
            downL += 1
        }
        // allDivs.id[new_column] !== allDivs.cla
    }

    evt.target.classList.add('red')
}

//make div box
function render(){
    for(i=0 ; i <(column * row) ; i++){
        newDiv = document.createElement('div');
        newDiv.setAttribute('id' , i)
        allDivs.appendChild(newDiv)
        if (bombArray.includes(i)){
            newDiv.setAttribute('class' , 'bomb')
        }
    }
    reset.style.display = 'block'
    refresh.style.display = 'block'
}

function init(){
    allDivs.style.display = 'none'
    reset.style.display = 'none'
    refresh.style.display = 'none'
    menu.style.display = 'flex'
    logo.style.display = 'block'
}