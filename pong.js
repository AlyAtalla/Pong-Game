const canvas= document.querySelector("#pong");
const ctx=canvas.getContext("2d");
const net={
    x: canvas.width/2-1,
    y:0,
    width:2,
    height:10,
    color: "Green",
}
function drawRect(x,y,w,h,color){
ctx.fillStyle= color;
ctx.fillRect(x,y,w,h)
}
drawRect(0,0,canvas.width,canvas.height,"BLACK");
function drawCircle(x,y,r,color){
    ctx.fillStyle=color;
    ctx.beginPath();
 ctx.arc(x,y,r,0,Math.PI*2, false);
 ctx.closePath();
 ctx.fill();
}
drawCircle(100,100,50,"Pink");

function drawText(text,x,y,color){
    ctx.fillStyle=color;
    ctx.font="45px Gloria Hallelujah";
    ctx.fillText(text,x,y);

}
drawText("Let's Play",200,300,"Green");

function drawNet(){
    for(let i=0; i<=canvas.height; i+=15){
        drawRect(net.x,net.y + i ,net.width,net.height,net.color);
    }

}


function render(){
    drawRect(0,0,canvas.width,canvas.height,"BLACK");

drawNet();

drawText("0",canvas.width/5,canvas.height/7,"Green");
drawText("0",(3*canvas.width)/4,canvas.height/7,"Green");


}




    

function game(){
    render()
    
}

const FPS=60;
setInterval(game, 1000/FPS);
