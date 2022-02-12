import "./style.css";
import * as THREE from "three";

// 1. Scence
const scene = new THREE.Scene();

// 2. Objects
// red box with 1,1,1 width, height, depth
const box = new THREE.BoxGeometry(1, 1, 1);
// Make it red by mesh
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(box, material);
// Add Objects to scene
scene.add(mesh);

// 3. Camera
const width = 800;
const height = 600;
const camera = new THREE.PerspectiveCamera(50, width / height);
camera.position.z = 3;

// 4. rerender
const canvas = document.querySelector("#webgl");
const rerender = new THREE.WebGLRenderer({ canvas });
rerender.setSize(800, 600);
rerender.render(scene, camera);
