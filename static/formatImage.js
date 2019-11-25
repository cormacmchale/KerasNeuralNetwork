//not an option messed with canvas
//zoom into the canvas to draw the figure in correct pixel format
var pixelData = new ImageData(28,28);
canvas = document.getElementById('predictionCanvas');
ctx = canvas.getContext("2d");
w = canvas.width;
h = canvas.height;
//adapted from = https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
//adtaped from = https://stackoverflow.com/questions/18796921/passing-javascript-array-to-flask
//variables
var canvas, ctx, flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;
var x = "black", y = 2.5;
//get the canvas and add the events
function init() 
{
canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);
}
function erase()
{
ctx.clearRect(0, 0, 280, 280);
}
function getData()
{
pixelData = ctx.getImageData(0, 0, 28, 28);
}
function saveImage()
{
//save pixel Image to an array
var pythonArray = [];
getData()
//erase the canvas after everything is complete
setTimeout(erase(),0);
//convert all pixels to a single value
//from 4 values per pixel to one
for(var i = 0; i<pixelData.data.length-1;i+=4)
{
var pixel = pixelData.data[i]+pixelData.data[i+1]+pixelData.data[i+2]+pixelData.data[i+3];
if(pixel > 0)
{
pixel = 1;
}
else
{
pixel = 0
}
pythonArray.push(pixel);
}
//ajax request
$.ajax({
        type : "POST",
        url : "/makePrediction",
        data: JSON.stringify({'pixelArray': pythonArray}),
        contentType: 'application/json;charset=UTF-8',
        success: function(result)
        {
            document.getElementById("result").innerHTML = result;
        }
      });
}   
function draw() {
ctx.beginPath();
ctx.moveTo(prevX, prevY);
ctx.lineTo(currX, currY);
ctx.strokeStyle = x;
ctx.lineWidth = y;
ctx.stroke();
ctx.closePath();
}
function findxy(res, e) 
{
if (res == 'down') {
prevX = currX;
prevY = currY;
currX = e.clientX - canvas.offsetLeft;
currY = e.clientY - canvas.offsetTop;

flag = true;
dot_flag = true;
if (dot_flag) {
    ctx.beginPath();
    ctx.fillStyle = x;
    ctx.fillRect(currX, currY, 2.5, 2.5);
    ctx.closePath();
    dot_flag = false;
}
}
if (res == 'up' || res == "out") {
flag = false;
}
if (res == 'move') {
if (flag) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    draw();
}
}
}