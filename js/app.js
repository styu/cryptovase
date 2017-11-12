import { getVaseParams } from "./vaseify";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1 );
document.body.appendChild( renderer.domElement );

var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );

var vasePoints = getVaseParams();
var points = getVaseParams().map(point => new THREE.Vector2(point[0], point[1]));
points = points.concat(getVaseParams().slice().reverse().map(point => new THREE.Vector2(point[0] - 0.35, point[1])));

var phiLength = 0;
var geometry = new THREE.LatheGeometry(
    points, 30, -Math.PI / 2, phiLength
);
phiLength += Math.PI / 30;

var material = new THREE.MeshLambertMaterial( { color: 0x38a2f7 } );
var lathe = new THREE.Mesh( geometry, material );
lathe.rotation.x += Math.PI / 4;
scene.add( lathe );
var hasPaused = false;

var render = function () {
    if (phiLength < Math.PI * 2) {
        requestAnimationFrame( render );

        geometry = new THREE.LatheBufferGeometry(
            points, 30, -Math.PI / 2, phiLength
        );
        phiLength += Math.PI / 30;
        lathe.geometry.dispose();

        lathe.geometry = geometry;

        renderer.render( scene, camera );
    }
};


render();

