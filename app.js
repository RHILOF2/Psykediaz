import * as THREE from './three.js-master/build/three.module.js';

import Stats from './three.js-master/examples/jsm/libs/stats.module.js';

// scene & camera
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 13;


// renderer
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);


// lumières
let lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1.25, 0, 100);
lights[1] = new THREE.PointLight(0xffffff, 1.5, 0, 100);
lights[2] = new THREE.PointLight(0xffffff, 1.35, 0, 100);

lights[0].position.set(0, 0, 0);
lights[1].position.set(0, 0, 300);
lights[2].position.set(- 100, - 200, - 100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

let mesh = new THREE.Object3D();
THREE.ImageUtils.crossOrigin = '';

// texture
let loader = new THREE.TextureLoader();
loader.crossOrigin = '';
let texture = loader.load('./test2.jpg');
// http://res.cloudinary.com/dspq4okwt/image/upload/v1496611611/stripe_359fc47827b0fe1149670218060be91a_k2d6kd.png <- image blanche et noir
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.offset.set(0, 0);
// l'emplacement du repeat
texture.repeat.set(30, 40);
console.log(texture)

// mesh
mesh.add(new THREE.Mesh(
  new THREE.TorusGeometry(9, 7, 60, 100),
  new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    map: texture,
    side: THREE.DoubleSide,
  })
))

// le sol
mesh.rotation.x = Math.PI / -1;
scene.add(mesh);


// fonction render du début & la rotation
function rotateTorus() {
  mesh.rotation.z += 4;
}

let render = function () {
  requestAnimationFrame(render);
  rotateTorus();
  renderer.render(scene, camera);
};

// ----------------
window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
render();
// ----------------