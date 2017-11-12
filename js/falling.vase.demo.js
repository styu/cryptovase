import { getVaseParams } from "./vaseify";

Physijs.scripts.worker = './js/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';

var initScene, render, renderer, scene, ground, light, camera, spawnChair,
    ground_material, chair_material, loader;

initScene = function() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    const scale = 2;
    const width = 400 * scale;
    const height = 300 * scale;
    renderer.setSize( width, height );
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    document.getElementById('vaseWindow').appendChild(renderer.domElement);

    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3( 0, -50, 0 ));
    scene.addEventListener(
        'update',
        function() {
            scene.simulate( undefined, 2 );
        }
    );

    camera = new THREE.PerspectiveCamera(
        35,
        width / height,
        1,
        1000
    );
    camera.position.set( 60, 50, 60 );
    camera.lookAt( scene.position );
    scene.add( camera );

    // Light
    light = new THREE.DirectionalLight( 0xFFFFFF );
    light.position.set( 20, 40, -15 );
    light.target.position.copy( scene.position );
    light.castShadow = true;
    light.shadowCameraLeft = -60;
    light.shadowCameraTop = -60;
    light.shadowCameraRight = 60;
    light.shadowCameraBottom = 60;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 200;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 2048;
    light.shadowDarkness = .7;
    scene.add( light );

    // Loader
    loader = new THREE.TextureLoader();

    // Materials
    ground_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ map: loader.load( 'js/images/rocks.jpg' ) }),
        .8, // high friction
        .4 // low restitution
    );
    ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
    ground_material.map.repeat.set( 3, 3 );

    // Ground
    ground = new Physijs.BoxMesh(
        new THREE.BoxGeometry(100, 1, 100),
        ground_material,
        0 // mass
    );
    ground.position.y -= 30;
    ground.receiveShadow = true;
    scene.add( ground );

    spawnChair();

    requestAnimationFrame( render );
    scene.simulate();
};

spawnChair = (function() {
    var doSpawn;

    doSpawn = function() {
        // var setOfVasePoints = [];
        var vasePoints = getVaseParams();
        var points = vasePoints.map(point => new THREE.Vector2(point[0], point[1]));

        var phiLength = Math.PI / 10;
        var geometry = new THREE.LatheGeometry(
            points, 30, -Math.PI / 2, Math.PI * 2
        );

        var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0x38a2f7 }),
            .6, // medium friction
            .2 // low restitution
        );
        var lathe = new Physijs.BoxMesh(geometry, material);

        lathe.position.y = 50;
        lathe.position.x = Math.random() * 50 - 25;
        lathe.position.z = Math.random() * 50 - 25;

        lathe.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
        );

        lathe.addEventListener( 'ready', spawnChair );
        scene.add( lathe );
    };

    return function() {
        setTimeout( doSpawn, 300 );
    };
})();

render = function() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};

$("#start").click(() => {
    $("#start").fadeOut(150);
    setTimeout(() => {
        initScene();
    }, 350)
})

// window.onload = initScene;