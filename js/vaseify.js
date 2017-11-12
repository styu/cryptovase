getVaseParams = function (seed) {
    var features = {
        foot1: [2, 0],
        foot2: [1.5, 1],
        foot3: [1.5, 1.5],
        body1: [2.5, 3],
        body2: [3, 6],
        body3: [2.7, 8],
        shoulder1: [1.5, 10],
        neck1: [1.5, 10.5],
        neck2: [1.5, 11],
        mouth1: [3, 13],
        mouth2: [3, 13.5]
    }

    var points = [];

    for (i in features) {
        points.push(features[i])
    }

    return points
}

// takes list of points and generates them
drawVase = function (seed) {
    
    var params = getVaseParams(seed);
    var scale = 30;
    
    var c2 = document.getElementById('c').getContext('2d');
    c2.fillStyle = '#f00';
    c2.beginPath();
    c2.moveTo(0, params[(params.length-1)][1]*scale);

    for (i in params) {
        vertex = params[i]
        c2.lineTo(vertex[0]*scale + Math.random()*60-30, (13.5-vertex[1])*scale);
    }
    c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();
}

$(function () {
    drawVase(hash);
});


/*

$(document).ready(function () {
    var marker = 'rgba(9,120,120,0.9)';
    var markerWidth = 1;

    var lastEvent;
    var mouseDown = false;

    var $canvas = $('canvas');
    var context = $('canvas')[0].getContext('2d');
    var $canvas = $('#canvas');
    //console.log($canvas);

    $canvas.mousedown(function (e) {
        lastEvent = e;
        mouseDown = true;
        //console.log(lastEvent);
    }).mousemove(function (e) {
        if (mouseDown) {

            context.beginPath();

            context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
            context.lineTo(e.offsetX, e.offsetY);
            context.lineWidth = markerWidth;
            context.strokeStyle = marker;
            context.lineCap = 'round';
            context.stroke();

            lastEvent = e;

        }
    }).mouseup(function () {
        mouseDown = false;
    });

    var changeWidth = function () {
        markerWidth = $('#marker').val();
        console.log(markerWidth);
    }

    var clear = function () {
        context.clearRect(0, 0, 450, 500);
    }

    $('#clear').on('click', clear);

    $('#marker').change(changeWidth);

});//endJQuery///////

*/