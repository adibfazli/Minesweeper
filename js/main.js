
//-----------------CONST and VAR-------------------
var mineCount , column , row , board , bombPercentage , bombArray , bombRandom , newDiv , allDivs , logo , menu , size , difficulty , play , container , reset , refresh , winCondition ,flagAndBomb , flagged , empetyCellCount , flagDisplayCount , sound , back_music , speaker, playingOrPause;
//      Time
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);
bombArray = []
flagged = []
// ---------------------------------sounds OBJ------:
const soundLab = {
    victory: 'sound/victory.mp3',
    gameOver : 'sound/Game_Over.mp3',
    flagOn : 'sound/flag_on.mp3',
    flagOff: 'sound/flag_off.mp3',
    trap : 'sound/hit_trap.mp3',
    start : 'sound/play.mp3'
}
//-------------------CACHED-----------------------
logo = document.querySelector(".logo")
menu = document.querySelector(".menu")
size = document.getElementById('select');
difficulty = document.getElementById('difficulty');
play = document.getElementById('play')
container = document.querySelector('.container');
reset = document.querySelector('.reset')
refresh = document.querySelector('.refresh')
allDivs = document.createElement('div').classList.add('Alldivs')
sound = document.getElementById('sound')
back_music = document.getElementById('music')
speaker = document.getElementById('speaker')
//------------------EVENT LISTENER-----------------
container.addEventListener('click' , clickHandler);
container.addEventListener('contextmenu', rightClicked)
play.addEventListener('click', playHandler)
reset.addEventListener('click' , init)
refresh.addEventListener('click' , playHandler)
speaker.addEventListener('click' , playAndPause)
//--------------------------------------------------------------------------------------------FUNCTION---------------------
document.querySelector('body').style.backgroundImage = "url(image/bb)"
function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}
//--------------------music player-----
function playAndPause(){
    if(playingOrPause){
        speaker.setAttribute('src' , 'image/mute.png')
        back_music.pause()
        playingOrPause = 0
    }
    else{
        back_music.play()
        speaker.setAttribute('src' , 'image/speaker.png')
        playingOrPause = 1
    }
}
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
//                                   right click / flag
function rightClicked(evt) {
    evt.preventDefault();
    if(evt.button===2 && !flagged.includes(parseInt(evt.target.id)) && winCondition && flagDisplayCount > 0 && evt.target.style.backgroundImage !== 'none'){
        sound.setAttribute('src' , soundLab.flagOn)
        sound.play()
        evt.target.style.backgroundImage = 'url(image/flaged.png)';
        flagged.push(parseInt(evt.target.id))
        flagDisplayCount--
        document.getElementById('flagCountHtml').textContent = `X ${flagDisplayCount}`
    }else if(evt.button===2 && flagged.includes(parseInt(evt.target.id)) && winCondition && evt.target.style.backgroundImage !== 'none'){
        sound.setAttribute('src' , soundLab.flagOff)
        sound.play()
        evt.target.style.backgroundImage = 'url(image/cheese.png)'
        flagged = flagged.filter(item => item !== parseInt(evt.target.id))
        flagDisplayCount++
        document.getElementById('flagCountHtml').textContent = `X ${flagDisplayCount}`
    }
    winnerCheck ()
}
//                                     ** Play button **
function playHandler(){
    totalSeconds = 0
    const player = new Audio();
    sound.setAttribute('src' , soundLab.start)
    sound.play()
    document.querySelector('.timeAndFlag').style.display= 'flex'
    document.getElementById('flagCountHtml').style.textContent = flagDisplayCount
    winCondition = true
    flagged = []
    document.querySelector('.victory').style.display= 'none'
    document.querySelector('.victory2').style.display= 'none'
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
    //                                     ** difficulty **
    if(difficulty.value === 'Easy'){
        bombPercentage = (column*row)*0.1
    }else if (difficulty.value === 'Medium' ){
        bombPercentage = (column*row)*0.2
    }else {
        bombPercentage = (column*row)*0.3
    }
    allDivs.style["grid-template-columns"] = `repeat(${column}, 40px)`;
    allDivs.style["grid-template-row"] = `repeat(${row}, 31px)`;
    allDivs.style["grid-column-gap"] = '3px';
    allDivs.style["grid-row-gap"] = '0px';
    //                                    **  setting the board **
    board = new Array((column*row) -1).fill(0);
    for (i=0 ; i <= bombPercentage -1 ; i++){
        bombRandom = Math.floor(Math.random()*(column*row))
        if(!bombArray.includes(bombRandom))bombArray.push(bombRandom);
        board.splice(bombArray[i] , 1 , -1);
    }
    flagDisplayCount = bombArray.length
    document.getElementById('flagCountHtml').textContent = `X ${flagDisplayCount}`
    render()
}
//                                     ** make div box **
function render(){
    for(i=0 ; i <(column * row) ; i++){
        newDiv = document.createElement('div');
        newDiv.setAttribute('id' , i)
        allDivs.appendChild(newDiv)
        newDiv.textContent = 0
        if (bombArray.includes(i)){
            newDiv.setAttribute('class' , 'bomb')
        }
        else if (!bombArray.includes(i)){
            newDiv.value = true
            newDiv.name = ''
        }
    }
    //                                 ** setting the text content **
    for(i=0 ; i <(column * row) ; i++){
        if(bombArray.includes(i)){
            if(document.getElementById(i+1) && !((i+1)/column === Math.floor((i+1)/column ))) document.getElementById(i+1).textContent = parseInt(document.getElementById(i+1).textContent) + 1 ;
            if(document.getElementById(i - column + 1) && !((i+1)/column  === Math.floor((i+1)/column )))document.getElementById(i - column + 1).textContent = parseInt(document.getElementById(i - column + 1).textContent) + 1 ;
            if(document.getElementById(i - column))document.getElementById(i - column).textContent = parseInt(document.getElementById(i - column).textContent) + 1 ;
            if(document.getElementById(i - column - 1) && !(i/column === Math.floor(i/column)))document.getElementById(i - column - 1).textContent = parseInt(document.getElementById(i - column - 1).textContent) + 1 ;
            if(document.getElementById(i - 1) && !(i/column === Math.floor(i/column)))document.getElementById(i - 1).textContent = parseInt(document.getElementById(i - 1).textContent) + 1 ;
            if(document.getElementById(i + column - 1) && !(i/column === Math.floor(i/column)))document.getElementById(i + column - 1).textContent = parseInt(document.getElementById(i + column - 1).textContent) + 1 ;
            if(document.getElementById(i + column))document.getElementById(i + column).textContent = parseInt(document.getElementById(i + column).textContent) + 1 ;
            if(document.getElementById(i  + column + 1) && !((i+1)/column  === Math.floor((i+1)/column )))document.getElementById(i  + column + 1).textContent = parseInt(document.getElementById(i  + column + 1).textContent) + 1;
        };
    };
    //                                 ** setting the numbers color **
    for(i=0 ; i <(column * row) ; i++){
        if(document.getElementById(i).textContent=='1') document.getElementById(i).style.color = 'lightblue'
        if(document.getElementById(i).textContent=='2') document.getElementById(i).style.color = 'yellowgreen'
        if(document.getElementById(i).textContent=='3') document.getElementById(i).style.color = 'darkorange'
        if(document.getElementById(i).textContent=='4') document.getElementById(i).style.color = 'red'
        if(document.getElementById(i).textContent=='5') document.getElementById(i).style.color = 'darkgray'
        if(document.getElementById(i).textContent=='6') document.getElementById(i).style.color = 'white'
        if(document.getElementById(i).textContent=='7') document.getElementById(i).style.color = 'purple'
        if(document.getElementById(i).textContent=='8') document.getElementById(i).style.color = 'black'
    }
    reset.style.display = 'block';
    refresh.style.display = 'block';
}
function init(){
    winCondition = true
    document.body.style.backgroundImage = "url('image/bb')";
    allDivs.style.display = 'none';
    reset.style.display = 'none';
    refresh.style.display = 'none';
    menu.style.display = 'flex';
    logo.style.display = 'block';
    flagged = []
    document.querySelector('.victory').style.display= 'none'
    document.querySelector('.victory2').style.display= 'none'
    document.querySelector('.timeAndFlag').style.display= 'none'
    totalSeconds = 0
}
//                                      box click
function clickHandler(evt){
    if( !flagged.includes(parseInt(evt.target.id)) && winCondition && evt.target.value !== 'flagged' && evt.target.style.backgroundImage !== 'none'){
        if(evt.target.textContent!== '0' && !bombArray.includes(parseInt(evt.target.id))){
            evt.target.style.backgroundImage = 'none';
            evt.target.style.textIndent = '0';
        }else{
            if(!bombArray.includes(parseInt(evt.target.id))){
                unbox(parseInt(evt.target.id))
            }else{
                sound.setAttribute('src' , soundLab.trap)
                sound.play()
                document.getElementById('soundOver').play()
                document.querySelector('body').style.backgroundImage = "url(image/lost_back.jpg)"
                for(i=0 ; i <(column * row) ; i++){
                    if(bombArray.includes(i)){
                        if(flagged.includes(i)){
                            document.getElementById(i).style.backgroundImage = 'url(image/trap_broken.png)';
                        }else{
                            document.getElementById(i).style.backgroundImage = 'url(image/trap.png)';
                        }
                    }
                }
                winCondition = false
            }
        }
    }
    winnerCheck ()
}
function winnerCheck (){
    flagAndBomb = 0
    empetyCellCount = 0
    for(i=0 ; i <(column * row) ; i++){
        if(document.getElementById(i).style.backgroundImage == 'none') empetyCellCount++
    }
    for(i = 0 ; i<bombArray.length ; i++){
        if (flagged.includes(bombArray[i])) flagAndBomb++
    }
    if(flagAndBomb == bombArray.length && empetyCellCount == (column * row) - flagAndBomb){
        for(i=0 ; i <(column * row) ; i++){
            if(flagged.includes(i)){
                document.getElementById(i).style.backgroundImage = 'none';
                document.getElementById(i).style.backgroundImage = 'url(image/trap_broken.png)';
            }
        }
        winCondition = false
        sound.setAttribute('src' , soundLab.victory)
        sound.play()
        document.querySelector('.victory').style.display= 'block'
        document.querySelector('.victory2').style.display= 'block'
    }
}
function unbox (divId){
    let div = document.getElementById(divId);
    if(!flagged.includes(parseInt(divId)) && divId === 0 && div.value){
        div.name = "ltc";
        div.style.backgroundImage = 'none';
       if(div.textContent !== '0')div.style.textIndent = '0'
    }
    else if( !flagged.includes(parseInt(divId)) && divId+1 === column && div.value){
        div.name = "rtc"
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0'
        ;}
    else if (!flagged.includes(parseInt(divId)) &&divId+1 === column * row && div.value) {
        div.name = "rbc"
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0'
        ;}
    else if (!flagged.includes(parseInt(divId)) &&divId+1 === (column*row) - column + 1 && div.value) {
        div.name = "lbc"
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0'
        ;}
    else if (!flagged.includes(parseInt(divId)) &&(divId+1)/column === Math.floor((divId+2)/column) && div.value){
        div.name = "rw"
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0' 
    }
    else if(!flagged.includes(parseInt(divId)) &&divId%column === 0 && div.value){
        div.name = "lw"
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0'  
        }
    else if(!flagged.includes(parseInt(divId)) &&(divId + column) < (column*row)  && (divId - column) > 0 && div.value){
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0'
    }
    else if(!flagged.includes(parseInt(divId)) &&(divId + column) < (column*row) && div.value ){
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0'
            }
    else if(!flagged.includes(parseInt(divId)) &&(divId - column) >= 0 && div.value){
        div.style.backgroundImage = 'none';
        if(div.textContent !== '0')div.style.textIndent = '0'
            };
    if(div.textContent == 0 && div.value && div.name ==""){
        if( (divId+column) < (column*row) && (divId-column) > 0){
            div.value=false;
            unbox(divId+column);
            div.value=false;
            unbox(divId-column);
            div.value=false;
            unbox(divId+1);
            div.value=false;
            unbox(divId-1);
        }  
        else if((divId+column) < (column*row)){
            unbox(divId+1);
            div.value=false;
            unbox(divId-1);
            div.value=false;
        }           
    }
        else if(div.textContent == 0 && div.value && div.name !==""){
            return;
        }
     };