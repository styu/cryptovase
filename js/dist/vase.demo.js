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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
            coords: [2, 12],
            hashId: 7
        },
        mouth2: {
            coords: [2, 12.3],
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

    return points;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getVaseParams;


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vaseify__ = __webpack_require__(0);


// takes list of points and generates them
const drawVase = function (seed) {

    var params = Object(__WEBPACK_IMPORTED_MODULE_0__vaseify__["a" /* getVaseParams */])(seed);
    var scale = 30;

    var c2 = document.getElementById('c').getContext('2d');
    c2.fillStyle = '#f00';
    c2.beginPath();
    // c2.moveTo(0, params[(params.length-1)][1]*scale);

    for (let i in params) {
        const vertex = params[i];
        c2.lineTo(vertex[0] * scale, (13.5 - vertex[1]) * scale);
    }
    // c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();
};

$(function () {
    // hash = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
    let hash = undefined;
    drawVase(hash);
});

/***/ })
/******/ ]);