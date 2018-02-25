//Game Logic for Pong game
let canvas; //the canvas reference
let canvasContext; //the canvas content
let ballX; //the ball's X position
let ballY; //the ball's Y position
let bat1Y; //player 1's bat Y position
let bat2Y; //player 2 bat Y position
let bat1X; //player 1 bat X position
let bat2X; //player 2 bat X position
let ballSpeedX = 10; //Ball X speed - 10 by default
let ballSpeedY = 3; //Ball Y speed - 3 by default
let deltaY;  //difference from centre of bat
let bat1Width; // X width of player 1 bat
let bat2Width; // X width of player 2 bat
let bat1Height;  // the height of player 1's bat
let bat2Height; //the height of player 2s bat
let ballRadius; //the radius of the ball
let p1score=0; //player 1 score
let p2score=0; //player 2 score
const winningScore=4; //the score that is needed to win - 4 by default
let winScreen=false; //flag to show the winscreen
let winMessage;   //message ot be shown upon winning
window.onload = function(){
    console.log("Start");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    let halfHeight = canvas.height/2
    let halfWidth = canvas.width/2
    console.log(halfHeight + " " + halfWidth)
    ballX = halfWidth/2;
    ballY = halfHeight;
    bat1Y = halfHeight/1.5;
    bat2Y = halfHeight/1.5;
    bat1X = 0;
    bat2X = (canvas.width)-(canvas.width/32)
    bat1Height = canvas.height/5;
    bat1Width = canvas.width/32;
    bat2Height = canvas.height / 5;
    bat2Width = canvas.width/32;
    ballRadius = 10
    const fps = 60
    setInterval(function(){
        moveAll();
        drawAll()},1000/fps);
    
    document.addEventListener('mousedown', clickToContinue)
    canvas.addEventListener('mousemove', function(evt){
        let mousePos = calculateMousePos(evt);
        bat1Y=mousePos.y - bat1Height/2
    })
    drawNet()
};

function clickToContinue(evt) {
    winScreen = !winScreen;
}
function calculateMousePos(evt){ //work out where the mouse is within the canvas
    let rect = canvas.getBoundingClientRect(); //get the rectangle for the canvas
    let root = document.documentElement; //get the rectangle for the document
    let mouseX = evt.clientX - rect.left - root.scrollLeft; 
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
};

function AImovement(){
    if (ballY > bat2Y+bat2Height/2){
        bat2Y+=4
    };
    if (ballY < bat2Y + bat2Height / 2) {
            bat2Y -= 4
        };
};

function moveAll(){
    if (winScreen){
        return;
    }
    AImovement();
    ballX+=ballSpeedX;
    ballY+=ballSpeedY;
    if (ballX < bat1Width && ballY > bat1Y && ballY < bat1Y+bat1Height){
        ballSpeedX=-ballSpeedX;
        deltaY = ballY - (bat1Y + bat1Height/2)
        ballSpeedY = deltaY * 0.15
        console.log(ballSpeedY);
    };
     if (ballX > canvas.width-bat2Width && ballY > bat2Y && ballY < bat2Y + bat1Height) {
            ballSpeedX = -ballSpeedX;
                  deltaY = ballY - (bat2Y + bat2Height/2)
                  ballSpeedY = deltaY * 0.15
        };
    if (ballX > canvas.width-ballRadius || ballX<0+ballRadius){
        ballReset();
    };
    if (ballY > canvas.height-ballRadius || ballY < 0+ballRadius) {
            ballSpeedY = -ballSpeedY
        };
};

function ballReset(){
    if (ballX<canvas.width/2){
        p2score++;
        if (p2score === winningScore) {
                win(2);
            }
        ballX = canvas.width / 1.5
        bat2Y = canvas.height/2;

    } else if (ballX > canvas.width/2) {
        p1score++
        if(p1score === winningScore){
            win(1);
        }
        ballX = canvas.width / 1.5
    };
    ballSpeedX=-ballSpeedX;
    ballSpeedY=2;
    ballY = canvas.height/2
 
}

function win(player){
    winMessage = "Player"+player+" won the game! Please click to replay";
    p1score=0;
    p2score=0;
    winScreen=true;
};

function drawAll(){
    if (winScreen){
         drawRect(0,0, canvas.width, canvas.height,"black");
         canvasContext.fillStyle = "white"
         canvasContext.fillText(winMessage, 120, canvas.height/2);
         return;
    };
    drawRect(0, 0, canvas.width, canvas.height, "grey") // start x, start y, +x, +y
    drawNet();
    drawRect(bat1X, bat1Y, bat1Width, bat1Height, "white");
    drawRect(bat2X, bat2Y, bat2Width, bat2Height, "white");
    drawBall(ballX, ballY, ballRadius, "blue"); 
    canvasContext.font = "30px Arial"
    canvasContext.fillStyle = "white";
    canvasContext.fillText(p1score, ((canvas.width/2)-100),100);
    canvasContext.fillText(p2score, ((canvas.width/2)+100),100);
};

function drawNet(){
    for(let i=7;i<canvas.height;i+=40){
        drawRect((canvas.width/2)-2, i, 4, 20, "white")
    }
}
function drawRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor // picking the fill colour
    canvasContext.fillRect(leftX, topY, width, height) 
};

function drawBall(leftX, topY, radius, drawColor) {
    canvasContext.fillStyle = drawColor // picking the fill colour
    canvasContext.beginPath();
    canvasContext.arc(leftX, topY, radius,0, Math.PI*2, true);
    canvasContext.fill();
};
