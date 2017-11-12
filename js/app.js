import { getVaseParams } from "./vaseify";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

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
// points = points.concat(vasePoints.slice().reverse().map(point => new THREE.Vector2(point[0] - 0.35, point[1])));

var phiLength = Math.PI / 10;
var geometry = new THREE.LatheGeometry(
    points, 30, -Math.PI / 2, phiLength
);

var material = new THREE.MeshLambertMaterial({ color: 0x38a2f7 });
var lathe = new THREE.Mesh(geometry, material);
lathe.rotation.x += Math.PI / 8;
scene.add(lathe);
var hasPaused = false;

var phiVelocity = Math.PI / 90;
var totalSteps  = (Math.PI * 2) / (Math.PI / 90);
var currentStep = 0;

var bezier = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

var render = function () {
    lathe.rotation.x += Math.PI / 1500;
    lathe.rotation.z -= Math.PI / 6000;

    requestAnimationFrame(render);
    if (currentStep <= totalSteps) {

        phiLength = bezier(currentStep / totalSteps) * Math.PI*2
        geometry = new THREE.LatheBufferGeometry(
            points, 30, -Math.PI / 2, phiLength
        );
        lathe.geometry.dispose();

        lathe.geometry = geometry;
        currentStep ++;
    }
    renderer.render(scene, camera);
};

renderer.render(scene, camera);
setTimeout(function () {
    // lathe.rotation.x += Math.PI / 8;
    points = points.concat(vasePoints.slice().reverse().map(point => new THREE.Vector2(point[0] - 0.35, point[1])));
    geometry = new THREE.LatheGeometry(
        points, 30, -Math.PI / 2, phiLength
    );
    lathe.geometry.dispose();
    lathe.geometry = geometry;
    render();
}, 500);
// render();

