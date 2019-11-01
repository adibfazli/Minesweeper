//-----------------CONST and VAR-------------------
var height , width , mineCount , column , row , board , bombPercenterg , bombArray , bombRandom , newDiv;

//-------------------CACHED-----------------------
bombArray = []
var logo = document.querySelector(".logo")
var menu = document.querySelector(".menu")

var size = document.getElementById('select');
var difficulty = document.getElementById('difficulty');

var play = document.getElementById('play')

var container = document.querySelector('.container');
var reset = document.querySelector('.reset')
var refresh = document.querySelector('.refresh')



//------------------EVENT LISTENER-----------------
container.addEventListener('click' , clickHandler);

play.addEventListener('click', playHandler)

//--------------------FUNCTION---------------------
//size
function playHandler(){
    menu.style.display = 'none'
    logo.style.display = 'none'
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
        bombPercenterg = (column*row)*0.1
    }else if (difficulty.value === 'Medium' ){
        bombPercenterg = (column*row)*0.2
    }else {
        bombPercenterg = (column*row)*0.3
    }
    container.style["grid-template-columns"] = `repeat(${column}, 31px)`;
    container.style["grid-template-row"] = `repeat(${row}, 31px)`;
    //setting the board
    board = new Array((column*row) -1).fill(0);
    for (i=0 ; i < bombPercenterg ; i++){
        bombRandom = Math.floor(Math.random()*(column*row))
        bombArray.push(bombRandom);

        board.splice(bombArray[i] , 1 , -1);
    }
    render()
}
//box click
function clickHandler(evt){
    evt.target.classList.add('red')
}
//make div box
function render(){
    for(i=0 ; i <(column * row) ; i++){
        newDiv = document.createElement('div');
        newDiv.setAttribute('id' , i)
        container.appendChild(newDiv)
        if (bombArray.includes(i)){
            newDiv.setAttribute('class' , 'bomb')
        }
    }
    reset.style.display = 'block'
    refresh.style.display = 'block'
}

function init(){
}








