import Sprite from "./components/entities/Sprite.js";

export const GRAVITY = 0.7;
export const canvas =
  document.querySelector("canvas") || new HTMLCanvasElement();
export const context =
  canvas.getContext("2d") || new CanvasRenderingContext2D();
const keys = {
  a: { pressed: false },
  d: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

class Game {
  private player: Sprite;
  private enemy: Sprite;

  constructor() {
    this.initCanvasSize();
    this.fillBackground();

    this.player = new Sprite({
      position: { x: 100, y: 100 },
      velocity: { x: 0, y: 10 },
      lastKey: "",
    });

    this.enemy = new Sprite({
      position: { x: 400, y: 100 },
      velocity: { x: 0, y: 0 },
      lastKey: "",
    });

    this.animate();
    this.handleKeyInput();
  }

  private initCanvasSize(): void {
    canvas.width = 1024;
    canvas.height = 576;
  }

  private fillBackground() {
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  private animate() {
    window.requestAnimationFrame(() => this.animate());

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    this.controlMovement();
  }

  private handleKeyInput() {
    window.addEventListener("keydown", (event) => {
      // player 1 control
      switch (event.key) {
        case "a":
          keys.a.pressed = true;
          this.player.lastKey = "a";
          break;
        case "d":
          keys.d.pressed = true;
          this.player.lastKey = "d";
          break;
        case "w":
          if (this.player.velocity.y <= 5) this.player.velocity.y = -20;
          break;
      }

      // player 2 (enemy) control
      switch (event.key) {
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          this.enemy.lastKey = "ArrowLeft";
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          this.enemy.lastKey = "ArrowRight";
          break;
        case "ArrowUp":
          if (this.enemy.velocity.y <= 5) this.enemy.velocity.y = -20;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      // player 1 control
      switch (event.key) {
        case "a":
          keys.a.pressed = false;
          break;
        case "d":
          keys.d.pressed = false;
          break;
      }

      // player 2 (enemy) control
      switch (event.key) {
        case "ArrowLeft":
          keys.ArrowLeft.pressed = false;
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = false;
          break;
      }
    });
  }

  private controlMovement() {
    this.player.update();
    this.enemy.update();

    this.player.velocity.x = 0;
    this.enemy.velocity.x = 0;

    if (keys.a.pressed && this.player.lastKey === "a")
      this.player.velocity.x = -5;

    if (keys.d.pressed && this.player.lastKey === "d")
      this.player.velocity.x = 5;

    if (keys.ArrowLeft.pressed && this.enemy.lastKey === "ArrowLeft")
      this.enemy.velocity.x = -5;

    if (keys.ArrowRight.pressed && this.enemy.lastKey === "ArrowRight")
      this.enemy.velocity.x = 5;
  }
}

new Game();
