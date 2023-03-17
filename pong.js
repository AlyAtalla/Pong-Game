const canvas = document.querySelector("#pong");
const ctx = canvas.getContext("2d");

const COM_LEVEL= 0.5;
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 20;
const BALL_START_SPEED = 1;

const player = {
    x: 0,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "Goldenrod",
    score: 0,
}
const computer = {
    x: canvas.width - PLAYER_WIDTH,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "Crimson",
    score: 0,
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: BALL_START_SPEED,
    velocityX: 5,
    velocityY: 5,
    color: "Pink",
}

const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "Green",
}
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h)
}
drawRect(0, 0, canvas.width, canvas.height, "BLACK");
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}
drawCircle(100, 100, 50, "Pink");

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px Gloria Hallelujah";
    ctx.fillText(text, x, y);

}
drawText("Let's Play", 200, 300, "Green");

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }

}


function render() {
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");

    drawNet();

    drawText(player.score, canvas.width / 5, canvas.height / 7, "Green");
    drawText(computer.score, (3 * canvas.width) / 4, canvas.height / 7, "Green");

    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);

    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function collision(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return(
       b.right > p.left && b.bottom> p.top&& b.left< p.right && b.top< p.bottom
    );
}

canvas.addEventListener("mousemove", (e) => {
    let rect= canvas.getBoundingClientRect();

    player.y = e.clientY - rect.top -player.height/2;
    
});





function lerp(a ,b, t){
    return a + (b-a)*t;

}

function update() {
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = - ball.velocityY;
    }

    let selectedPlayer = ball.x < canvas.width / 2 ? player : computer
    if (collision(ball, selectedPlayer)) {
        ball.velocityX = -ball.velocityX


    }

    let targetPos= ball.y-computer.height/2;
    let currentPos= computer.y;
    computer.y=lerp(currentPos, targetPos, COM_LEVEL);
}




function game() {
    update();
    render();

}

const FPS = 60;
setInterval(game, 1000 / FPS);
