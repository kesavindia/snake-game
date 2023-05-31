const gameboard=document.getElementById("gameboard");
const context= gameboard.getcontext("2d")
const scoreText= document.querySelector('#scoreVal');
const Width=gameboard.width;
const Height=gameboard.height;
const UNIT= 20;
let foodX;
let foodY;
let xVel=20;
let yVel=0;
let Score=0;
let active = true;
let started=false;
let paused=false;

let snake= [{x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0}];
window.addEventListener("keydown",keyPress);
startGame();
function startGame(){
    context.fillStyle="#212121"
    context.fillRect(0,0,Width,Height)
    createFood();
    displayFood();
    drawSnake();    
}

