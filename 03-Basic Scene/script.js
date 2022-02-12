console.log("hello three.js!");
let defaultProps = {
  boxColor: 0xff0000,
  boxX: 1,
  boxY: 1,
  boxZ: 1,
  cameraPositionX: 0,
  cameraPositionY: 0,
  cameraPositionZ: 3,
  cameraWidth: 800,
  cameraHeight: 600,
  cameraFov: 75,
};
function renderBox(props = defaultProps) {
  const {
    boxColor,
    boxX,
    boxY,
    boxZ,
    cameraPositionX,
    cameraPositionY,
    cameraPositionZ,
    cameraWidth,
    cameraHeight,
    cameraFov,
  } = props;
  // Scene
  const scene = new THREE.Scene();

  // Objects(with material)
  const geometry = new THREE.BoxGeometry(boxX, boxY, boxZ);
  const material = new THREE.MeshBasicMaterial({
    color: Number(boxColor),
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Camera
  // The position property is an object with three relevant properties: x, y and z. By default, Three.js considers the forward/backward axis to be z.
  // Sizes
  const sizes = {
    width: Number(cameraWidth),
    height: Number(cameraHeight),
  };
  const camera = new THREE.PerspectiveCamera(
    Number(cameraFov),
    sizes.width / sizes.height
  );
  camera.position.x = cameraPositionX;
  camera.position.y = cameraPositionY;
  camera.position.z = cameraPositionZ;

  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Renderrer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
}
renderBox();
const ids = [
  "boxColor",
  "boxX",
  "boxY",
  "boxZ",
  "cameraPositionX",
  "cameraPositionY",
  "cameraPositionZ",
  "cameraWidth",
  "cameraHeight",
  "cameraFov",
];
for (let index = 0; index < ids.length; index++) {
  const id = ids[index];
  document.getElementById(id).addEventListener("change", (e) => {
    defaultProps = { ...defaultProps, [id]: e.target.value };
    renderBox(defaultProps);
  });
}
