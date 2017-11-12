import { getVaseParams } from "./vaseify";
import * as exportSTL from '../node_modules/threejs-export-stl/src';

Physijs.scripts.worker = './js/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';

var scene = new THREE.Scene();
// scene.setGravity(new THREE.Vector3( 0, 0, 0 ));
const scale = 2;
const width = 400 * scale;
const height = 300 * scale;
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setPixelRatio(window.devicePixelRatio);
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
// ok what

var drawVase = function (points) {
    var scale = 18;
    var firstCanvas = document.getElementsByTagName("canvas")[0];
    var overlayCanvas = document.getElementById('overlay');
    overlayCanvas.width = firstCanvas.width;
    overlayCanvas.height = firstCanvas.height;
    var c2 = overlayCanvas.getContext('2d');
    c2.fillStyle = '#38a2f7';
    c2.beginPath();
    // c2.moveTo(0, params[(params.length-1)][1]*scale);

    for (let i in points) {
        let vertex = points[i]
        c2.lineTo(firstCanvas.width/2 - (vertex[0] * scale), (12.3 - vertex[1]) * scale + 80);
    }
    // c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();
}

// points = points.concat(vasePoints.slice().reverse().map(point => new THREE.Vector2(point[0] - 0.35, point[1])));

var phiLength = Math.PI / 10;
var geometry = new THREE.LatheGeometry(
    points, 30, -Math.PI / 2, phiLength
);

var material = new THREE.MeshLambertMaterial({ color: 0x38a2f7 });
var lathe = new Physijs.BoxMesh(geometry, material);
lathe.rotation.x += Math.PI / 8;
scene.add(lathe);


var geometry = new THREE.BoxGeometry( 30, 1, 30 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const groundMaterial = Physijs.createMaterial(
    material,
    0.8,
    0.3,
);
// var groundMaterial = Physijs.createMaterial(
//     new THREE.MeshLambertMaterial({ color: 0x795548 }),
//     0.8,
//     0.3,
// );
let ground = new Physijs.BoxMesh(
    geometry,
    groundMaterial,
    0 // mass
);
ground.rotation.x += Math.PI / 8;
ground.receiveShadow = true;
scene.add( ground );

var hasPaused = false;

var finalVase;

var phiVelocity = Math.PI / 90;
var totalSteps = (Math.PI * 2) / (Math.PI / 90);
var currentStep = 0;

var bezier = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }

var hasSetGravity = false;
var render = function () {
    lathe.rotation.x += Math.PI / 1500;
    lathe.rotation.z -= Math.PI / 6000;

    requestAnimationFrame(render);
    if (currentStep <= totalSteps) {

        phiLength = bezier(currentStep / totalSteps) * Math.PI * 2
        geometry = new THREE.LatheBufferGeometry(
            points, 30, -Math.PI / 2, phiLength
        );
        lathe.geometry.dispose();

        lathe.geometry = geometry;
        finalVase = geometry;
        currentStep += 1;
    } else if (!hasSetGravity) {
        scene = new Physijs.Scene();
        scene.setGravity(new THREE.Vector3(0, -10, 0));
        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);
        scene.add(lathe);
        scene.add( ground );
        scene.addEventListener(
            'update',
            function () {

                scene.simulate(undefined, 2);
            }
        );
        hasSetGravity = true;
    }
    renderer.render(scene, camera);

    if (hasSetGravity) {
        scene.simulate();
    }
    // scene.simulate();
};

renderer.render(scene, camera);

$(function() {
    drawVase(vasePoints);
    startRotate();
})

// scene.simulate();
var startRotate = function () {
    // lathe.rotation.x += Math.PI / 8;
    // points = points.concat(vasePoints.slice().reverse().map(point => new THREE.Vector2(point[0] - 0.35, point[1])));
    geometry = new THREE.LatheGeometry(
        points, 30, -Math.PI / 2, phiLength
    );
    lathe.geometry.dispose();
    lathe.geometry = geometry;
    render();
}
// render();

var downloadVase = function() {
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
    // a.click();
    document.body.removeChild(a);
}