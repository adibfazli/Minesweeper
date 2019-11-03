//-----------------CONST and VAR-------------------
var height , width , mineCount , column , row , board , bombPercentage , bombArray , bombRandom , newDiv , allDivs , logo , menu , size , difficulty , play , container , reset , refresh ;

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

//                                      size
function playHandler(){
    document.body.style.backgroundImage = "url('image/back_new2.jpg')"
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
    //                                      difficulty
    if(difficulty.value === 'Easy'){
        bombPercentage = (column*row)*0.1
    }else if (difficulty.value === 'Medium' ){
        bombPercentage = (column*row)*0.2
    }else {
        bombPercentage = (column*row)*0.3
    }
    allDivs.style["grid-template-columns"] = `repeat(${column}, 40px)`;
    allDivs.style["grid-template-row"] = `repeat(${row}, 31px)`;
    //                                      setting the board
    board = new Array((column*row) -1).fill(0);
    for (i=0 ; i <= bombPercentage -1 ; i++){
        bombRandom = Math.floor(Math.random()*(column*row))
        bombArray.push(bombRandom);
        board.splice(bombArray[i] , 1 , -1);
    }
    render()
}
//                                      box click
function clickHandler(evt){
    if(board[evt.target.id] !== -1){
        // if(board[parseInt(evt.target.id) + 1] || board[parseInt(evt.target.id) - column + 1] || board[parseInt(evt.target.id) - column] || board[parseInt(evt.target.id) - column - 1] || board[parseInt(evt.target.id) - 1] || board[parseInt(evt.target.id) + column - 1] || board[parseInt(evt.target.id) + column] || board[parseInt(evt.target.id) + column + 1] ){
        //     evt.target.textContent = (board[parseInt(evt.target.id) + 1]) + (board[parseInt(evt.target.id) - column + 1]) + (board[parseInt(evt.target.id) - column ]) + (board[parseInt(evt.target.id) - column - 1]) + (board[parseInt(evt.target.id) - 1]) + (board[parseInt(evt.target.id) + column - 1]) + (board[parseInt(evt.target.id) + column]) + (board[parseInt(evt.target.id) + column + 1])
        // }
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
        //                                      Diagonal Up Right    ↗ ↗ ↗ ↗ ↗ ↗ ↗ ↗ 
        // && document.getElementById(diagonalUpR) this is part of the while condition
        while (!bombArray.includes(diagonalUpR) && upR <= 48 && document.getElementById(diagonalUpR) && document.getElementById(diagonalUpR).textContent == 0){
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp) && document.getElementById(columnUp).textContent == 0){
                document.getElementById(columnUp).style.backgroundImage = 'none'
                // document.getElementById(columnUp).style.backgroundColor = 'yellow'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(columnDown).textContent == 0){
                document.getElementById(columnDown).style.backgroundImage = 'none'
                // document.getElementById(columnDown).style.backgroundColor = 'yellow'
                columnDown += column;
            }
            document.getElementById(diagonalUpR).style.backgroundImage = 'none'
            // document.getElementById(diagonalUpR).style.backgroundColor = 'yellow'
            diagonalUpR -= (column -1);
            columnUp = diagonalUpR;
            columnDown = diagonalUpR;
            upR += 1
            console.log('there')
        }
        //                                      Diagonal Down Right    ↘ ↘ ↘ ↘ ↘ ↘ ↘ ↘
        while (!bombArray.includes(diagonalDownR) && downR <= 48 && document.getElementById(diagonalDownR) && document.getElementById(diagonalDownR).textContent == 0){
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp) &&  document.getElementById(columnUp).textContent == 0){
                document.getElementById(columnUp).style.backgroundImage = 'none'
                // document.getElementById(columnUp).style.backgroundColor = 'yellow'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(columnDown).textContent == 0){
                document.getElementById(columnDown).style.backgroundImage = 'none'
                // document.getElementById(columnDown).style.backgroundColor = 'yellow'
                columnDown += column;
            }
            document.getElementById(diagonalDownR).style.backgroundImage = 'none'
            // document.getElementById(diagonalDownR).style.backgroundColor = 'yellow'
            diagonalDownR += (column +1)
            columnUp = diagonalDownR;
            columnDown = diagonalDownR;
            downR += 1
            console.log('here')
        }
        //                                      Diagonal Up Left    ↖ ↖ ↖ ↖ ↖ ↖ ↖ ↖ 
        while (!bombArray.includes(diagonalUpL) && upL <= 48 && document.getElementById(diagonalUpL) && document.getElementById(diagonalUpL).textContent == 0){
            console.log(upR)
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp) &&  document.getElementById(columnUp).textContent == 0){
                document.getElementById(columnUp).style.backgroundImage = 'none'
                // document.getElementById(columnUp).style.backgroundColor = 'purple'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(columnDown).textContent == 0){
                document.getElementById(columnDown).style.backgroundImage = 'none'
                // document.getElementById(columnDown).style.backgroundColor = 'purple'
                columnDown += column;
            }
            document.getElementById(diagonalUpL).style.backgroundImage = 'none'
            // document.getElementById(diagonalUpL).style.backgroundColor = 'purple'
            diagonalUpL -= (column +1)
            columnUp = diagonalUpL;
            columnDown = diagonalUpL;
            upL += 1
        }
        //                                      Diagonal Down Left    ↙ ↙ ↙ ↙ ↙ ↙ ↙ ↙ 
        while (!bombArray.includes(diagonalDownL) && downL <= 48 && document.getElementById(diagonalDownL) && document.getElementById(diagonalDownL).textContent == 0){
            console.log(upR)
            while (!bombArray.includes(columnUp) && document.getElementById(columnUp) && document.getElementById(columnUp).textContent == 0){
                document.getElementById(columnUp).style.backgroundImage = 'none'
                // document.getElementById(columnUp).style.backgroundColor = 'purple'
                columnUp -= column;
            }
            while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(columnDown).textContent == 0){
                document.getElementById(columnDown).style.backgroundImage = 'none'
                // document.getElementById(columnDown).style.backgroundColor = 'purple'
                columnDown += column;
            }
            document.getElementById(diagonalDownL).style.backgroundImage = 'none'
            // document.getElementById(diagonalDownL).style.backgroundColor = 'purple'
            diagonalDownL += (column -1)
            columnUp = diagonalDownL;
            columnDown = diagonalDownL;
            downL += 1
        }
    }else{
        alert('you lost')
    }

    // evt.target.classList.add('red')
}

//                                      make div box
function render(){
    for(i=0 ; i <(column * row) ; i++){
        newDiv = document.createElement('div');
        newDiv.setAttribute('id' , i)
        allDivs.appendChild(newDiv)
        newDiv.textContent = 0
        if (bombArray.includes(i)){
            newDiv.setAttribute('class' , 'bomb')
        }
    }
        for(i=0 ; i <(column * row) ; i++){
            if(bombArray.includes(i)){
                if(document.getElementById(i+1)) document.getElementById(i+1).textContent = parseInt(document.getElementById(i+1).textContent) + 1 
                if(document.getElementById(i - column + 1))document.getElementById(i - column + 1).textContent = parseInt(document.getElementById(i - column + 1).textContent) + 1 
                if(document.getElementById(i - column))document.getElementById(i - column).textContent = parseInt(document.getElementById(i - column).textContent) + 1 
                if(document.getElementById(i - column - 1))document.getElementById(i - column - 1).textContent = parseInt(document.getElementById(i - column - 1).textContent) + 1 
                if(document.getElementById(i - 1))document.getElementById(i - 1).textContent = parseInt(document.getElementById(i - 1).textContent) + 1 
                if(document.getElementById(i + column - 1))document.getElementById(i + column - 1).textContent = parseInt(document.getElementById(i + column - 1).textContent) + 1 
                if(document.getElementById(i + column))document.getElementById(i + column).textContent = parseInt(document.getElementById(i + column).textContent) + 1 
                if(document.getElementById(i  + column + 1))document.getElementById(i  + column + 1).textContent = parseInt(document.getElementById(i  + column + 1).textContent) + 1 
                //(board[parseInt(evt.target.id) + column + 1])
            }
        }
    reset.style.display = 'block'
    refresh.style.display = 'block'
}
function init(){
    document.body.style.backgroundImage = "url('image/bb')"
    allDivs.style.display = 'none'
    reset.style.display = 'none'
    refresh.style.display = 'none'
    menu.style.display = 'flex'
    logo.style.display = 'block'
}