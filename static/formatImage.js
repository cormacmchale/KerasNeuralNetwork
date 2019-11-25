//placeholder for the pixel data
var pixelData = new ImageData(28, 28);
//access the canvas for use in code
canvas = document.getElementById('predictionCanvas');
ctx = canvas.getContext("2d");
//height and width for clearing the canvas and getting pixel info
w = canvas.width;
h = canvas.height;
//adapted from = https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
//adtaped from = https://stackoverflow.com/questions/18796921/passing-javascript-array-to-flask
//variables for teh drawing functionality
var canvas, ctx, flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;
var x = "black", y = 1.65;
//get the canvas and add the events
init()
function init() {
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
//actually draw on the canvas
function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}
//get the co-ordinates of the mouse
function findxy(res, e) {
    //if the mouse is being clicked over the canvas
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = (e.clientX - canvas.offsetLeft);
        currY = (e.clientY - canvas.offsetTop);
        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            //thickness = 1.65 seems to have goo results
            ctx.fillRect(currX, currY, 1.65, 1.65);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    //if the mouse is being moved while clicked
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
//clear the canvas for another drawing
function erase() {
    ctx.clearRect(0, 0, h, w);
}
//collect the Image data of the canvas
function getData() {
    pixelData = ctx.getImageData(0, 0, h, w);
}
//this function is called when the user clicks on prediction
function saveImage() {
    getData()
    //save pixel Image to an array
    var pythonArray = [];
    //erase the canvas after everything is complete
    setTimeout(erase(), 0);
    //convert all pixels to a single value
    //from 4 values per pixel to one
    for (var i = 0; i < pixelData.data.length - 1; i += 4) {
        var pixel = pixelData.data[i] + pixelData.data[i + 1] + pixelData.data[i + 2] + pixelData.data[i + 3];
        //alter it to a similar format that the Mnist has been changed to
        if (pixel > 0) {
            pixel = 5.5;
        }
        else {
            pixel = 0
        }
        //populate the array for the correct size for the neural network
        pythonArray.push(pixel);
    }
    //ajax request
    $.ajax({
        type: "POST",
        url: "/makePrediction",
        data: JSON.stringify({ 'pixelArray': pythonArray }),
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
            //change result on wenpage to prediction
            document.getElementById("result").innerHTML = result;
        }
    });
}   