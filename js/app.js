import { getVaseParams } from "./vaseify";
import * as exportSTL from '../node_modules/threejs-export-stl/src';

Physijs.scripts.worker = './js/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';

var scene = new THREE.Scene();
const scale = 2;
const width = 400 * scale;
const height = 300 * scale;
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xffffff, 1);
document.getElementById('vaseWindow').appendChild(renderer.domElement);

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(- 100, - 200, - 100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

var vasePoints = getVaseParams();
var points = vasePoints.map(point => new THREE.Vector2(point[0], point[1]));
const lowest = Math.min(...vasePoints.map(point => point[1]));
const highest = Math.max(...vasePoints.map(point => point[1]));

// scaling for canvas frame I'm going to lose this
var canvasVaseScale = 18;
var vaseColor = "#38a2f7"

/// shhhhh

var theFinalVasePoints = [];
var fadeOutVase = function () {
    $('#overlay').fadeOut(1000);
    startRotate();
}
var drawAlmostVase = function (c2, points, step, totalSteps, norun) {

    c2.clearRect(0, 0, c2.canvas.width, c2.canvas.height);

    if (step < totalSteps) {
        step += 5;
        if (!norun) {
            setTimeout(function () {
                drawAlmostVase(c2, points, step, totalSteps);
            }, 30);
        }
        c2.fillStyle = "#ffffff";
        c2.rect(0, 0, c2.canvas.width, c2.canvas.height);
        c2.fill();

    } else {
        fadeOutVase();
    }

    c2.fillStyle = vaseColor;
    c2.beginPath();
    // c2.moveTo(0, params[(params.length-1)][1]*scale);

    var oneSide = [];
    //for (let i in points) {
    theFinalVasePoints = [];

    for (var i = 0; i < 11; i++) {
        let vertex = points[i]
        console.log(c2)
        let finalX = (vertex[0] * canvasVaseScale)
        let x = c2.canvas.width / 2 - (100 - (100 - finalX) * (bezier(step / totalSteps)))
        oneSide.push(x);
        let y = (12.3 - vertex[1]) * canvasVaseScale + 80
        c2.lineTo(x, y);
        theFinalVasePoints.push([x, y])
    }
    for (var i = 11; i < 22; i++) {
        let vertex = points[i]
        let x = oneSide[(22 - i) - 1] + 10
        let y = (12.3 - vertex[1]) * canvasVaseScale + 80
        c2.lineTo(x, y);
        theFinalVasePoints.push([x, y])
    }

    for (var i = 22; i < points.length; i++) {
        let vertex = points[i]
        console.log(c2)
        let finalX = (vertex[0] * canvasVaseScale)
        let x = c2.canvas.width / 2
        let y = (12.3 - vertex[1]) * canvasVaseScale + 80
        c2.lineTo(x, y);
        theFinalVasePoints.push([x, y])
    }
    /*
    for (let i in points) {
        let vertex = points[i]
        c2.lineTo(firstCanvas.width / 2 + ((vertex[0] * scale)), (12.3 - vertex[1]) * scale + 80);
    }
    */

    // c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();

    c2.beginPath();
    // c2.moveTo(0, params[(params.length-1)][1]*scale);

    var oneSide = [];
    //for (let i in points) {
    for (var i = 0; i < 11; i++) {
        let vertex = points[i]
        console.log(c2)
        let finalX = (vertex[0] * canvasVaseScale)
        let x = c2.canvas.width / 2 + (100 - (100 - finalX) * (bezier(step / totalSteps)))
        oneSide.push(x);
        let y = (12.3 - vertex[1]) * canvasVaseScale + 80
        c2.lineTo(x, y);
    }
    for (var i = 11; i < 22; i++) {
        let vertex = points[i]
        let x = oneSide[(22 - i) - 1] - 10
        let y = (12.3 - vertex[1]) * canvasVaseScale + 80
        c2.lineTo(x, y);
    }

    for (var i = 22; i < points.length; i++) {
        let vertex = points[i]
        console.log(c2)
        let finalX = (vertex[0] * canvasVaseScale)
        let x = c2.canvas.width / 2
        let y = (12.3 - vertex[1]) * canvasVaseScale + 80
        c2.lineTo(x, y);
    }
    /*
    for (let i in points) {
        let vertex = points[i]
        c2.lineTo(firstCanvas.width / 2 + ((vertex[0] * scale)), (12.3 - vertex[1]) * scale + 80);
    }
    */

    // c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();

}

// var drawVase = function (c2, points) {

//     c2.fillStyle = vaseColor;
//     c2.beginPath();

//     for (let i in points) {
//         let vertex = points[i]
//         console.log(c2)
//         c2.lineTo(c2.canvas.width / 2 - (vertex[0] * canvasVaseScale), (12.3 - vertex[1]) * canvasVaseScale + 80);
//     }

//     /*
//     for (let i in points) {
//         let vertex = points[i]
//         c2.lineTo(firstCanvas.width / 2 + ((vertex[0] * scale)), (12.3 - vertex[1]) * scale + 80);
//     }
//     */
//     c2.closePath();
//     c2.fill();

// }


var phiLength = Math.PI / 10;
var geometry = new THREE.LatheGeometry(
    points, 30, -Math.PI / 2, phiLength
);

var material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0x38a2f7 }),
    .6, // medium friction
    .2 // low restitution
);
var lathe = new Physijs.BoxMesh(geometry, material);
lathe.rotation.x += Math.PI / 8;
scene.add(lathe);

// var groundGeometry = new THREE.BoxGeometry( 100, 1, 100 );
// const groundMaterial = Physijs.createMaterial(
//     new THREE.MeshBasicMaterial( {color: 0x795548} ),
//     0.8,
//     0.3,
// );
// let ground = new Physijs.BoxMesh(
//     groundGeometry,
//     groundMaterial,
//     0 // mass
// );
// ground.rotation.x += Math.PI / 10;
// ground.position.y -= 20;
// ground.receiveShadow = true;
// scene.add( ground );

// var groundFrontGeometry = new THREE.BoxGeometry(100, 20, 1);
// const groundFrontMaterial = Physijs.createMaterial(
//     new THREE.MeshBasicMaterial( {color: 0x000000} ),
//     0.8,
//     0.3,
// );
// let groundFront = new Physijs.BoxMesh(
//     groundFrontGeometry,
//     groundFrontMaterial,
//     0,
// );
// groundFront.rotation.x += Math.PI / 2;
// groundFront.receiveShadow = true;
// scene.add(groundFront)

var hasPaused = false;

var finalVase;

var phiVelocity = Math.PI / 90;
var totalSteps = (Math.PI * 2) / (Math.PI / 90);
var stepsBeforeGravityThreshold = totalSteps + 200;
var stepsBeforeSwingingThreshold = 50 + totalSteps;
var currentStep = 0;

var bezier = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }

var hasSetGravity = false;
var render = function () {

    if (stepsBeforeSwingingThreshold < currentStep ) {
        lathe.rotation.y -= Math.PI / 500;
    }
    lathe.rotation.x += Math.PI / 1200;

    if (stepsBeforeSwingingThreshold >= currentStep ) {
        lathe.rotation.z -= Math.PI / 4000;
    }

    requestAnimationFrame(render);
    if (currentStep <= totalSteps) {

        phiLength = bezier(currentStep / totalSteps) * Math.PI * 2
        geometry = new THREE.LatheBufferGeometry(
            points, 30, -Math.PI / 2, phiLength
        );
        lathe.geometry.dispose();

        lathe.geometry = geometry;
        finalVase = geometry;
    } else if (currentStep > stepsBeforeGravityThreshold && !hasSetGravity) {
        scene = new Physijs.Scene();
        scene.setGravity(new THREE.Vector3(0, -50, 0));
        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);
        scene.add(lathe);
        // scene.add( ground );
        // scene.add(groundFront);
        hasSetGravity = true;
    }
    currentStep += 1;
    renderer.render(scene, camera);

    if (currentStep === totalSteps) {
        downloadVase();
    }
    if (hasSetGravity) {
        scene.simulate();
    }
};

// renderer.render(scene, camera);

var c2;
$(function () {
    var firstCanvas = document.getElementsByTagName("canvas")[0];
    var overlayCanvas = document.getElementById('overlay');
    overlayCanvas.width = firstCanvas.width;
    overlayCanvas.height = firstCanvas.height;
    c2 = overlayCanvas.getContext('2d');

    renderer.render(scene, camera);
    drawAlmostVase(c2, vasePoints, 0, 300, true);
})

$(document).on('click', '.btn', function () {

    drawAlmostVase(c2, vasePoints, 0, 300);
})

var startRotate = function () {
    geometry = new THREE.LatheGeometry(
        points, 30, -Math.PI / 2, phiLength
    );
    lathe.geometry.dispose();
    lathe.geometry = geometry;
    render();
}

var downloadVase = function () {
    let g = finalVase;
    g.type = "BufferGeometry"
    console.log(g);
    let data = exportSTL.fromGeometry(g);
    console.log(data);
    const blob = new Blob([data], { type: exportSTL.mimeType });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vase.stl";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}