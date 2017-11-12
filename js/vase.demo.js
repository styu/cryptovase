import { getVaseParams } from "./vaseify";

// takes list of points and generates them
const drawVase = function (seed) {

    var params = getVaseParams(seed);
    var scale = 30;

    var c2 = document.getElementById('c').getContext('2d');
    c2.fillStyle = '#f00';
    c2.beginPath();
    // c2.moveTo(0, params[(params.length-1)][1]*scale);

    for (let i in params) {
        const vertex = params[i]
        c2.lineTo(vertex[0]*scale, (12.3-vertex[1])*scale);
    }
    // c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();
}

$(function () {
    // hash = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
    let hash = undefined;
    drawVase(hash);
});