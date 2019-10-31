//-----------------CONST and VAR-------------------
var height , width , mineCount;


//-------------------CACHED-----------------------
var logo = document.querySelector(".logo")
var menu = document.querySelector(".menu")

var size = document.getElementById('select');
var difficulty = document.getElementById('difficulty');

var play = document.getElementById('play')

var container = document.querySelector('.container');

//------------------EVENT LISTENER-----------------
container.addEventListener('click' , clickHandler);

play.addEventListener('click', playHandler)

// size.addEventListener('change', function(){
//     console.log(size.value)
// });

// difficulty.addEventListener('change', function(){
//     console.log(difficulty.value)
// });





//--------------------FUNCTION---------------------
function playHandler(){
    console.log(size.value)
    console.log(difficulty.value)
    menu.style.display = 'none'
    logo.style.display = 'none'
    render()

}
function clickHandler(evt){
    evt.target.classList.add('red')
    console.log(evt.target.classList)
}

function render(){
    for(i=0 ; i <400 ; i++){
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class' , i)
        container.appendChild(newDiv)
    }
}

function init(){
}








