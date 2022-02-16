import "./style.css";
import * as THREE from "three";

class ScoreGame {
  score = 0;
  width = 800;
  height = 600;
  scene = new THREE.Scene();
  ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  );
  box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  camera = new THREE.PerspectiveCamera(50, this.width / this.height);
  rerender = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl"),
  });
  constructor() {
    this.render();
    window.addEventListener("keydown", (e) => this.OnKeyChangeHandler(e));
  }
  render() {
    // Add Objects
    this.ball.name = "ball";
    this.box.name = "box";
    this.ball.position.set(
      Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 5),
      -1 * Math.floor(Math.random() * 10)
    );
    this.box.position.set(0, 0, 0);
    this.camera.position.set(0, 0, 6);
    // this.scene.add(new THREE.AxesHelper(10));
    this.scene.add(this.ball);
    this.scene.add(this.box);

    // Set rerender
    this.rerender.setSize(this.width, this.height);
    this.rerender.render(this.scene, this.camera);
  }
  checkScoring() {
    if (
      JSON.stringify(this.ball.position) === JSON.stringify(this.box.position)
    ) {
      this.score += 1;
      this.ball.position.set(
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 5),
        -1 * Math.floor(Math.random() * 10)
      );
      document.querySelector("#start-btn").textContent = `Score: ${this.score}`;
    }
  }
  OnKeyChangeHandler(e) {
    const key = e.key;
    switch (key) {
      case "w":
        this.box.position.z -= 1;
        break;
      case "s":
        this.box.position.z += 1;
        break;
      case "ArrowUp":
        this.box.position.y += 1;
        break;
      case "ArrowDown":
        this.box.position.y -= 1;
        break;
      case "ArrowLeft":
        this.box.position.x -= 1;
        break;
      case "ArrowRight":
        this.box.position.x += 1;
        break;
      default:
        break;
    }
    this.checkScoring();
    this.rerender.render(this.scene, this.camera);
  }
}

document.querySelector("#start-btn").addEventListener("click", () => {
  const game = new ScoreGame();
  document.querySelector("#start-btn").textContent = "Score: 0";
});
