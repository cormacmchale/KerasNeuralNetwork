//Image Data Object for collecting the Image Data for the server
var pixelData = new ImageData(28, 28);
//used as a placeholder to scale and re-draw image correctly
var imageObject = new Image();
//the array that gets sent to the server
var pythonArray = [];
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
var x = "black", y = 10;
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
            //thickness
            ctx.fillRect(currX, currY, 10, 10);
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
//also reset altered scale
function erase() {
    ctx.clearRect(0, 0, h, w);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    pythonArray = [];
}
//collect the Image data of the canvas
function getData() {
    imageObject.src = canvas.toDataURL();
    imageObject.onload = function () {
        erase();
        ctx.scale(.2, .2);
        ctx.drawImage(imageObject, 0, 0);
        pixelData = ctx.getImageData(0, 0, 28, 28);
        //convert all pixels to a single value
        //from 4 values per pixel to one
        for (var i = 0; i < pixelData.data.length - 1; i += 4) {
            var pixel = pixelData.data[i] + pixelData.data[i + 1] + pixelData.data[i + 2] + pixelData.data[i + 3];
            //alter it to a similar format that the Mnist has been changed to
            if (pixel > 0) {
                pixel = 1;
                pythonArray.push(pixel)
            }
            else {
                pixelData.data[i] = 0
                pythonArray.push(pixel)
            }
        }
        //for checking the number in console
        printImageToConsole(pythonArray);
        //ajax request
        $.ajax({
            type: "POST",
            url: "/makePrediction",
            data: JSON.stringify({ 'pixelArray': pythonArray }),
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                //change result on webpage to prediction
                document.getElementById("result").innerHTML = result;
            }
        });
        setTimeout(erase(), 0);
    }
    //for viewing on console
    function printImageToConsole(pythonArray) {
        for (var j = 0; j <= pythonArray.length - 28; j = j + 28) {
            console.log(pythonArray[j] + "" + pythonArray[j + 1] + pythonArray[j + 2] + pythonArray[j + 3] + pythonArray[j + 4] + pythonArray[j + 5] + pythonArray[j + 6] + pythonArray[j + 7] + pythonArray[j + 8] + pythonArray[j + 9] + pythonArray[j + 10] + pythonArray[j + 11]
                + pythonArray[j + 12] + pythonArray[j + 13] + pythonArray[j + 14] + pythonArray[j + 15] + pythonArray[j + 16] + pythonArray[j + 17] + pythonArray[j + 18] + pythonArray[j + 19] + pythonArray[j + 20] + pythonArray[j + 22] + pythonArray[j + 23]
                + pythonArray[j + 24] + pythonArray[j + 25] + pythonArray[j + 26] + pythonArray[j + 27] + "\n");
        }
    }

}  
