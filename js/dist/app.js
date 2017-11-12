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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const getVaseParams = function (seed) {
    var seed = seed || [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    var features = {
        foot1: {
            coords: [2, 0],
            hashId: 0
        },
        foot2: {
            coords: [1.5, 1],
            hashId: 0
        },
        foot3: {
            coords: [1.5, 1.5],
            hashId: 0
        },
        body1: {
            coords: [2.5, 3],
            hashId: 1
        },
        body2: {
            coords: [3, 6],
            hashId: 2,
            multiplierHash: 8
        },
        body3: {
            coords: [2.7, 8],
            hashId: 3
        },
        shoulder1: {
            coords: [1.5, 10],
            hashId: 4
        },
        neck1: {
            coords: [1, 10.5],
            hashId: 5
        },
        neck2: {
            coords: [1, 11],
            hashId: 6
        },
        mouth1: {
            coords: [1.5, 12],
            hashId: 7
        },
        mouth2: {
            coords: [1.5, 12.3],
            hashId: 7
        }
    };

    var points = [];
    var prevFeature;

    for (let i in features) {
        var heightVariance = 0;
        if (prevFeature) {
            // get difference between features
            let heightTolerance = features[i].coords[1] - features[prevFeature].coords[1];
            console.log(heightTolerance);
            heightVariance = heightTolerance * Math.random() / 2;
        }

        if (features[i].multiplierHash !== undefined) {
            var offset = seed[features[i].multiplierHash];
        } else {
            var offset = 0.5;
        }
        var y = features[i].coords[1] - heightVariance;
        var x = features[i].coords[0] + seed[features[i].hashId] + (offset - 0.5) * 3 + seed[8] * seed[8];

        points.push([x, y]);

        prevFeature = i;
    }

    var innerShell = [];
    for (let i in points) {
        let x = points[points.length - i - 1][0] - 0.3;
        let y = points[points.length - i - 1][1];
        if (i == points.length - 1) {
            innerShell.push([x - 0.5, y + 0.3]);
            innerShell.push([0, y + 0.3]);
            innerShell.push([0, y]);
            innerShell.push(points[0]);
        } else {
            innerShell.push([x, y]);
        }
    }

    points = points.concat(innerShell);

    return points;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getVaseParams;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vaseify__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_threejs_export_stl_src__ = __webpack_require__(3);



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
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

var vasePoints = Object(__WEBPACK_IMPORTED_MODULE_0__vaseify__["a" /* getVaseParams */])();
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
        let vertex = points[i];
        c2.lineTo(firstCanvas.width / 2 - vertex[0] * scale, (12.3 - vertex[1]) * scale + 80);
    }
    // c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();
};

// points = points.concat(vasePoints.slice().reverse().map(point => new THREE.Vector2(point[0] - 0.35, point[1])));

var phiLength = Math.PI / 10;
var geometry = new THREE.LatheGeometry(points, 30, -Math.PI / 2, phiLength);

var material = new THREE.MeshLambertMaterial({ color: 0x38a2f7 });
var lathe = new Physijs.BoxMesh(geometry, material);
lathe.rotation.x += Math.PI / 8;
scene.add(lathe);

// var groundMaterial = Physijs.createMaterial(
//     new THREE.MeshLambertMaterial({ color: 0x795548 }),
//     0.8,
//     0.3,
// );
// let ground = new Physijs.BoxMesh(
//     new THREE.BoxGeometry(100, 1, 100),
//     groundMaterial,
//     0 // mass
// );
// ground.receiveShadow = true;
// scene.add( ground );

var hasPaused = false;

var finalVase;

var phiVelocity = Math.PI / 90;
var totalSteps = Math.PI * 2 / (Math.PI / 90);
var currentStep = 0;

var bezier = function (t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

var hasSetGravity = false;
var render = function () {
    lathe.rotation.x += Math.PI / 1500;
    lathe.rotation.z -= Math.PI / 6000;

    requestAnimationFrame(render);
    if (currentStep <= totalSteps) {

        phiLength = bezier(currentStep / totalSteps) * Math.PI * 2;
        geometry = new THREE.LatheBufferGeometry(points, 30, -Math.PI / 2, phiLength);
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
        // scene.add( ground );
        scene.addEventListener('update', function () {

            scene.simulate(undefined, 2);
        });
        hasSetGravity = true;
    }
    renderer.render(scene, camera);

    if (hasSetGravity) {
        scene.simulate();
    }
    // scene.simulate();
};

renderer.render(scene, camera);

$(function () {
    drawVase(vasePoints);
    startRotate();
});

// scene.simulate();
var startRotate = function () {
    // lathe.rotation.x += Math.PI / 8;
    // points = points.concat(vasePoints.slice().reverse().map(point => new THREE.Vector2(point[0] - 0.35, point[1])));
    geometry = new THREE.LatheGeometry(points, 30, -Math.PI / 2, phiLength);
    lathe.geometry.dispose();
    lathe.geometry = geometry;
    render();
};
// render();

var downloadVase = function () {
    let g = finalVase;
    g.type = "BufferGeometry";
    console.log(g);
    let data = __WEBPACK_IMPORTED_MODULE_1__node_modules_threejs_export_stl_src__["a" /* fromGeometry */](g);
    console.log(data);
    const blob = new Blob([data], { type: __WEBPACK_IMPORTED_MODULE_1__node_modules_threejs_export_stl_src__["b" /* mimeType */] });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vase.stl";
    document.body.appendChild(a);
    // a.click();
    document.body.removeChild(a);
};

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromGeometry;
/* unused harmony export fromMesh */
const mimeType = 'application/vnd.ms-pki.stl';
/* harmony export (immutable) */ __webpack_exports__["b"] = mimeType;


const LITTLE_ENDIAN = true;

function writeVectorAscii(dataView, { x, y, z }, isNormal) {
  dataView.data += `${isNormal ? 'facet normal' : 'vertex'} ${x} ${y} ${z}\n`;
}

function writeVectorBinary(dataView, { x, y, z }) {
  writeFloat(dataView, x);
  writeFloat(dataView, y);
  writeFloat(dataView, z);
}

function writeFloat(dataView, float) {
  dataView.data.setFloat32(dataView.offset, float, LITTLE_ENDIAN);
  dataView.offset += 4;
}

function geometryToData(geometry, binary) {
  const faces = geometry.faces;
  const vertices = geometry.vertices;

  let dataView;
  if (binary) {
    const bufferSize = 84 + (50 * faces.length);
    const buffer = new ArrayBuffer(bufferSize);
    dataView = {
      data: new DataView(buffer),
      offset: 84
    };

    dataView.data.setUint32(80, faces.length, LITTLE_ENDIAN);
  } else {
    dataView = { data: 'solid\n' };
  }

  const writeVector = binary ? writeVectorBinary : writeVectorAscii;

  for (let i = 0; i < faces.length; i ++) {
    writeVector(dataView, faces[i].normal, true);

    if (!binary) {
      dataView.data += 'outer loop\n';
    }

    writeVector(dataView, vertices[faces[i].a], false);
    writeVector(dataView, vertices[faces[i].b], false);
    writeVector(dataView, vertices[faces[i].c], false);

    if (binary) {
      dataView.offset += 2;
    } else {
      dataView.data += 'endloop\nendfacet\n';
    }
  }

  if (!binary) {
    dataView.data += 'endsolid';
  }

  return binary ? dataView.data.buffer : dataView.data;
}

function fromGeometry(geometry, matrix, binary = true) {
  if (geometry.type === 'BufferGeometry') {
    geometry = new THREE.Geometry().fromBufferGeometry(geometry);
  } else if (geometry.type === 'Geometry') {
    geometry = geometry.clone();
  } else {
    throw new Error('Geometry is not an instance of BufferGeometry or Geometry');
  }

  if (matrix) {
    geometry.applyMatrix(matrix);
  }

  geometry.computeFaceNormals();

  return geometryToData(geometry, binary);
}

function fromMesh(mesh, binary) {
  mesh.updateMatrix();

  return fromGeometry(mesh.geometry, mesh.matrix, binary);
}


/***/ })
/******/ ]);