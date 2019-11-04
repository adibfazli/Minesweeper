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
window.addEventListener("keydown",checkKeyPress);

//--------------------FUNCTION---------------------
//Need function to run the buttons
//Need function to eliminate the empety cells sorounding the clicked cell
//Need function to reset the game

function checkKeyPress(key){
    if(key.which == 3) console.log('Hi')
}


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

    //                                  setting the text content
    for(i=0 ; i <(column * row) ; i++){
        if(bombArray.includes(i)){
            if(document.getElementById(i+1) && !((i+1)/column == Math.floor((i+1)/column))) document.getElementById(i+1).textContent = parseInt(document.getElementById(i+1).textContent) + 1 ;
            if(document.getElementById(i - column + 1) && !((i - column + 1)/column == Math.floor((i - column + 1)/column)))document.getElementById(i - column + 1).textContent = parseInt(document.getElementById(i - column + 1).textContent) + 1 ;
            if(document.getElementById(i - column))document.getElementById(i - column).textContent = parseInt(document.getElementById(i - column).textContent) + 1 ;
            if(document.getElementById(i - column - 1))document.getElementById(i - column - 1).textContent = parseInt(document.getElementById(i - column - 1).textContent) + 1 ;
            if(document.getElementById(i - 1))document.getElementById(i - 1).textContent = parseInt(document.getElementById(i - 1).textContent) + 1 ;
            if(document.getElementById(i + column - 1))document.getElementById(i + column - 1).textContent = parseInt(document.getElementById(i + column - 1).textContent) + 1 ;
            if(document.getElementById(i + column))document.getElementById(i + column).textContent = parseInt(document.getElementById(i + column).textContent) + 1 ;
            if(document.getElementById(i  + column + 1) && !((i  + column + 1)/column == Math.floor((i  + column + 1)/column)))document.getElementById(i  + column + 1).textContent = parseInt(document.getElementById(i  + column + 1).textContent) + 1;
        };
    };
    reset.style.display = 'block';
    refresh.style.display = 'block';
}
function init(){
    document.body.style.backgroundImage = "url('image/bb')";
    allDivs.style.display = 'none';
    reset.style.display = 'none';
    refresh.style.display = 'none';
    menu.style.display = 'flex';
    logo.style.display = 'block';
}

//                                      box click
function clickHandler(evt){
    if(evt.target.textContent!== '0'){
        evt.target.style.backgroundImage = 'none';
        evt.target.style.textIndent = '0';
    }else{
        if(board[evt.target.id] !== -1){
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
            while (!bombArray.includes(diagonalUpR) && upR <= 48 && document.getElementById(diagonalUpR) && document.getElementById(diagonalUpR)!== null){
                    while (!bombArray.includes(columnUp) && document.getElementById(columnUp) && document.getElementById(columnUp)!== null){
                        document.getElementById(columnUp).style.backgroundImage = 'none';
                        if(document.getElementById(columnUp).textContent !== "0" && document.getElementById(columnUp)!== null){
                            reveal(columnUp);
                            break;
                        };
                        columnUp -= column;
                    }
                    while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(columnDown)!== null){
                        document.getElementById(columnDown).style.backgroundImage = 'none';
                        if(document.getElementById(columnDown).textContent !== "0" && document.getElementById(columnDown)!== null){
                            reveal(columnDown);
                            break;
                        };
                        columnDown += column;
                    }
                    document.getElementById(diagonalUpR).style.backgroundImage = 'none';
                    if((diagonalUpR - column + 1)/column == Math.floor((diagonalUpR - column + 1)/column)) break;
                    if(document.getElementById(diagonalUpR).textContent !== '0'){
                        reveal(diagonalUpR);
                        break;
                    } 
                    diagonalUpR -= (column -1);
                    columnUp = diagonalUpR;
                    columnDown = diagonalUpR;
                    upR += 1;
            };
            //                                      Diagonal Down Right    ↘ ↘ ↘ ↘ ↘ ↘ ↘ ↘
            while (!bombArray.includes(diagonalDownR) && downR <= 48 && document.getElementById(diagonalDownR) && document.getElementById(diagonalDownR)!== null){
                    while (!bombArray.includes(columnUp) && document.getElementById(columnUp) && document.getElementById(columnUp)!== null ){
                        document.getElementById(columnUp).style.backgroundImage = 'none';
                        if(document.getElementById(columnUp).textContent !== "0" && document.getElementById(columnUp)!== null){
                            reveal(columnUp);
                            break;
                        };
                        columnUp -= column;
                    };
                    while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(columnDown)!== null ){
                        document.getElementById(columnDown).style.backgroundImage = 'none';
                        if(document.getElementById(columnDown).textContent !== "0" && document.getElementById(columnDown)!== null){
                            reveal(columnDown);
                            break;
                        };
                        columnDown += column;
                    }
                    document.getElementById(diagonalDownR).style.backgroundImage = 'none';
                    if((diagonalDownR + column + 1)/column == Math.floor((diagonalDownR + column + 1)/column)) break;
                    if(document.getElementById(diagonalDownR).textContent !== '0'){
                        reveal(diagonalDownR);
                        break;
                    } 
                    diagonalDownR += (column +1);
                    columnUp = diagonalDownR;
                    columnDown = diagonalDownR;
                    downR += 1;
            };
            //                                      Diagonal Up Left    ↖ ↖ ↖ ↖ ↖ ↖ ↖ ↖ 
            while (!bombArray.includes(diagonalUpL) && upL <= 48 && document.getElementById(diagonalUpL) && document.getElementById(diagonalUpL)!== null ){
                    while (!bombArray.includes(columnUp) && document.getElementById(columnUp) && document.getElementById(columnUp)!== null ){
                        document.getElementById(columnUp).style.backgroundImage = 'none';
                        if(document.getElementById(columnUp).textContent !== "0" && document.getElementById(columnUp)!== null){
                            reveal(columnUp);
                            break;
                        }
                        columnUp -= column;
                    };
                    while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(columnDown)!== null ){
                        document.getElementById(columnDown).style.backgroundImage = 'none';
                        if(document.getElementById(columnDown).textContent !== "0" && document.getElementById(columnDown)!== null){
                            reveal(columnDown);
                            break;
                        }
                        columnDown += column;
                    }
                    document.getElementById(diagonalUpL).style.backgroundImage = 'none';
                    if((diagonalUpL - 1)/column === Math.floor((diagonalUpL)/column)) break;
                    if(document.getElementById(diagonalUpL).textContent !== '0'){
                        reveal(diagonalUpL);
                        break;
                    } 
                    diagonalUpL -= (column +1);
                    columnUp = diagonalUpL;
                    columnDown = diagonalUpL;
                    upL += 1;
            }
            //                                      Diagonal Down Left    ↙ ↙ ↙ ↙ ↙ ↙ ↙ ↙ 
            while (!bombArray.includes(diagonalDownL) && downL <= 48 && document.getElementById(diagonalDownL) && document.getElementById(diagonalDownL)!== null ){
                    while (!bombArray.includes(columnUp) && document.getElementById(columnUp) && document.getElementById(diagonalUpR)!== NaN ){
                        document.getElementById(columnUp).style.backgroundImage = 'none';
                        if(document.getElementById(columnUp).textContent !== "0" && document.getElementById(columnUp)!== null){
                            reveal(columnUp);
                            break;
                        }
                        columnUp -= column;
                    };
                    while (!bombArray.includes(columnDown) && document.getElementById(columnDown) && document.getElementById(diagonalUpR)!== NaN ){
                        document.getElementById(columnDown).style.backgroundImage = 'none';
                        if(document.getElementById(columnDown).textContent !== "0" && document.getElementById(columnDown)!== null){
                            reveal(columnDown);
                            break;
                        }
                        columnDown += column;
                    };
                    document.getElementById(diagonalDownL).style.backgroundImage = 'none';
                    if((diagonalDownL - 1)/column === Math.floor((diagonalDownL )/column)) break;
                    if(document.getElementById(diagonalDownL).textContent !== '0'){
                        reveal(diagonalDownL);
                        break;
                    } 
                    diagonalDownL += (column -1);
                    columnUp = diagonalDownL;
                    columnDown = diagonalDownL;
                    downL += 1;
            }
        }else{
            alert('you lost');
        }
    }
}
function reveal(x){
    if(!bombArray.includes(x)){
        document.getElementById(x).style.backgroundImage = 'none';
        if(document.getElementById(x).textContent !== '0') document.getElementById(x).style.textIndent = '0';
    };
    if(!bombArray.includes(x + 1)){
        document.getElementById(x + 1).style.backgroundImage = 'none';
        if(document.getElementById(x + 1).textContent !== '0') document.getElementById(x + 1).style.textIndent = '0';
    };
    if(!bombArray.includes(x - column + 1)){
        document.getElementById(x - column + 1).style.backgroundImage = 'none';
        if(document.getElementById(x - column + 1).textContent !== '0')document.getElementById(x - column + 1).style.textIndent = '0';
    };
    if(!bombArray.includes(x - column)){
        document.getElementById(x - column).style.backgroundImage = 'none';
        if(document.getElementById(x - column).textContent !== '0')document.getElementById(x - column).style.textIndent = '0';
    };
    if(!bombArray.includes(x - column - 1)){
        document.getElementById(x - column - 1).style.backgroundImage = 'none';
        if(document.getElementById(x - column - 1).textContent !== '0')document.getElementById(x - column - 1).style.textIndent = '0';
    };
    if(!bombArray.includes(x - 1)){
        document.getElementById(x - 1).style.backgroundImage = 'none';
        if(document.getElementById(x - 1).textContent !== '0')document.getElementById(x - 1).style.textIndent = '0';
    };
    if(!bombArray.includes(x + column - 1)){
        document.getElementById(x + column - 1).style.backgroundImage = 'none';
        if(document.getElementById(x + column - 1).textContent !== '0')document.getElementById(x + column - 1).style.textIndent = '0';
    };
    if(!bombArray.includes(x + column)){
        document.getElementById(x + column).style.backgroundImage = 'none';
        if(document.getElementById(x + column).textContent !== '0')document.getElementById(x + column).style.textIndent = '0';
    };
    if(!bombArray.includes(x + column + 1)){
        document.getElementById(x + column + 1).style.backgroundImage = 'none';
        if(document.getElementById(x + column + 1).textContent !== '0')document.getElementById(x + column + 1).style.textIndent = '0';
    };
};
