/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

// var mesh = new THREE.Object3D();

// mesh.add( new THREE.LineSegments(

//     new THREE.Geometry(),

//     new THREE.LineBasicMaterial( {
//         color: 0xffffff,
//         transparent: true,
//         opacity: 0.5
//     } )

// ) );

// mesh.add( new THREE.Mesh(

//     new THREE.Geometry(),

//     new THREE.MeshPhongMaterial( {
//         color: 0x156289,
//         emissive: 0x072534,
//         side: THREE.DoubleSide,
//         flatShading: true
//     } )

// ) );

// var options = new THREE.MeshBasicMaterial({color: 0x2194CE});

// scene.add( mesh );

// var prevFog = false;

var points = [];

for (var i = 9; i >= 0; i--) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5 - 1, (i - 5) * 2));
}
for (var i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
}

var phiLength = 0;
var geometry = new THREE.LatheGeometry(points, 30, 0, phiLength);
phiLength += Math.PI / 30;

var material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
var lathe = new THREE.Mesh(geometry, material);
// lathe.rotation.x += Math.PI / 3;
scene.add(lathe);

var render = function () {
    if (phiLength < Math.PI * 2) {
        requestAnimationFrame(render);
        geometry = new THREE.LatheBufferGeometry(points, 30, 0, phiLength);
        phiLength += Math.PI / 30;
        lathe.geometry.dispose();

        lathe.geometry = geometry;

        renderer.render(scene, camera);
    }
};

render();

/***/ })
/******/ ]);