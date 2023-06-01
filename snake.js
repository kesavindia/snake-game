const gameboard=document.getElementById("gameboard");
const Restart=document.getElementById("Enter");
const context= gameboard.getContext("2d")
const scoreText= document.querySelector('#scoreVal');
const Width=gameboard.width
const Height=gameboard.height;
const UNIT= 20;
let foodX;
let foodY;
let xVel=UNIT;
let yVel=0;
let Score=0;

let active = true;
let started=false;
let paused=false;

let snake= [{x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0},{x:0,y:0}];
window.addEventListener("keydown",keyPress);
startGame();
function startGame(){
    context.fillStyle="#212121"
    context.fillRect(0,0,Width,Height)
    createFood();
    displayFood();
    drawSnake();    
}
function clearBoard(){
    context.fillStyle="#212121"
    //fillRect(xStart,yStart,width,height)
    context.fillRect(0,0,Width,Height)
}
function createFood(){
    foodX = Math.floor(Math.random()*Width/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*Height/UNIT)*UNIT;
}
function displayFood(){
    context.fillStyle='red';
    context.fillRect(foodX,foodY,UNIT,UNIT);
}
function drawSnake(){
    context.fillStyle="aqua";
    context.strokeStyle = '#212121';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT);
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT);
    })
}
const moveSnake=()=>{
    const head={x:snake[0].x+xVel,y:snake[0].y+yVel}
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){       
        Score+=1;
        scoreText.textContent=Score;
        createFood();
    }
    else{
        snake.pop();
    }
}
function nextTick(){
    if(active && !paused){
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 200);
    }
    else {
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!",Width/2,Height/2)   
    }
}
function reStartGame(){
    active=true;
    paused=false;
    started=false;
    snake= [{x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0},{x:0,y:0}];
    Score=0;    
    scoreText.textContent=Score;
    startGame();
}
function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
    //pause when space is pressed
    if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    const Enter = 13
    if(event.keyCode==Enter && !active){
      reStartGame();
    }  
   

    switch(true){
        
        //left key pressed and not going right
        case(event.keyCode==LEFT  && xVel!=UNIT):
            xVel=-UNIT;
            yVel = 0;
            break;
        //right key pressed and not going left
        case(event.keyCode==RIGHT && xVel!=-UNIT):
            xVel=UNIT;
            yVel=0;
            break;
        //Up key pressed and not going down
        case(event.keyCode==UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
        //down key pressed and not going up
        case(event.keyCode==DOWN && yVel!=-UNIT):
            xVel=0;
            yVel=UNIT;
            break;
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=Width):
        case(snake[0].y<0):
        case(snake[0].y>=Height):
            active=false;
            break;
    }
	//check snake head collision with snake body
	   for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            active = false;
        }
    }
    Restart.textContent='Press enter to restart again'
}

    
