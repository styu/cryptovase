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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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


// takes list of points and generates them
const drawVase = function (seed) {
    console.log(seed);

    var params = Object(__WEBPACK_IMPORTED_MODULE_0__vaseify__["a" /* getVaseParams */])(seed);
    var scale = 30;

    var c2 = document.getElementById('c').getContext('2d');
    c2.clearRect(0, 0, 800, 600);
    c2.fillStyle = '#f00';
    c2.beginPath();
    // c2.moveTo(0, params[(params.length-1)][1]*scale);

    for (let i in params) {
        const vertex = params[i];
        c2.lineTo(vertex[0] * scale, (12.3 - vertex[1]) * scale);
    }
    // c2.lineTo(0, 0)
    c2.closePath();
    c2.fill();
};
/* harmony export (immutable) */ __webpack_exports__["drawVase"] = drawVase;


$(function () {
    // hash = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
    let hash = undefined;
    drawVase(hash);
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vase_demo_js__ = __webpack_require__(1);

// Using the API from https://www.smartbit.com.au/api

// Gets the block from the blockchain at height blockNum and calls callback with the relevant data
// Data consists of:
// success - whether or not the block was successfully retrieved
// merkleroot - the big momma hash of all the transactitons
// nonce - the random number that gets 'mined'
// hash - the has of the current block, constructed from all the other data returned
// previous_block_hash - hash of the previous block
const getBlock = function (blockNum, callback) {
    $.ajax({
        url: "https://api.smartbit.com.au/v1/blockchain/block/" + blockNum,
        dataType: "json"
    }).done(function (data) {
        if (data && data.success) {
            console.log(blockNum + " get!");
            var ret = {
                success: true,
                nonce: data.block.nonce,
                merkleroot: data.block.merkleroot,
                hash: data.block.hash,
                previous_block_hash: data.block.previous_block_hash
            };
            callback(ret);
        } else {
            console.log(blockNum + " failed");
            var ret = { success: false };
            callback(ret);
        }
    });
};
/* harmony export (immutable) */ __webpack_exports__["getBlock"] = getBlock;


var hex2uint8 = function (hexString) {
    var bytes = new Uint8Array(hexString.length / 2);

    for (var i = 0; i < hexString.length - 1; i += 2) {
        bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }

    return bytes;
};

// Attempts to remine a block. Note that it doesn't use the
// full bitcoin header to hash.
const remineBlock = function (blockData) {
    var difficulty = 14;
    var matches = -1;
    var hash = 0;
    var hashHex = "";
    var bestMatch = -1;
    var newNonce;

    var tries = 0;
    var numTriesBox = $('#numTries');

    $('#origHash').text(blockData.hash);

    var g = setInterval(function () {
        var subTries = 0;
        while (subTries < 937) {
            subTries += 1;
            tries += 1;

            hash = sha256.create();

            hash.update(hex2uint8(blockData.previous_block_hash));
            hash.update(hex2uint8(blockData.merkleroot));

            newNonce = new Uint8Array(4);
            newNonce[0] = Math.random() * 256;
            newNonce[1] = Math.random() * 256;
            newNonce[2] = Math.random() * 256;
            newNonce[3] = Math.random() * 256;

            hash.update(newNonce);

            hashHex = hash.hex();

            matches = 0;
            for (var i in hashHex) {
                if (hashHex[i] == blockData.hash[i]) {
                    matches += 1;
                }
            }
            if (matches >= difficulty) {
                if (matches >= bestMatch) {
                    bestMatch = matches;
                    $('#bestMatch').text(matches / 1.28 + '%');
                }

                $('#bestHash').text(hashHex);
                var matchText = "";
                for (var i in hashHex) {
                    if (hashHex[i] == blockData.hash[i]) {
                        matchText += hashHex[i];
                    } else {
                        matchText += ".";
                    }
                }
                $('#matchHash').text(matchText);
                convertNonceToVase(newNonce, blockData);
            }
            if (tries % 7 == 0) {
                numTriesBox.text(tries);
            }
        }
        if (matches >= 25) {
            numTriesBox.text(tries);
            clearInterval(g);
        }
    }, 1);
};
/* harmony export (immutable) */ __webpack_exports__["remineBlock"] = remineBlock;


var convertNonceToVase = function (newNonce, blockData) {
    var seed = new Array();
    for (var i in newNonce) {
        seed.push(newNonce[i] % 16 / 16.0);
        seed.push(newNonce[i] / 16 % 16 / 16.0);
    }
    for (var i in blockData.hash) {
        seed.push(parseInt(blockData.hash[blockData.hash.length - 1 - i], 16) / 16.0);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__vase_demo_js__["drawVase"])(seed);
};

//getBlock(500, remineBlock);

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coin_adapter__ = __webpack_require__(2);

Object(__WEBPACK_IMPORTED_MODULE_0__coin_adapter__["getBlock"])(500, __WEBPACK_IMPORTED_MODULE_0__coin_adapter__["remineBlock"]);

/***/ })
/******/ ]);