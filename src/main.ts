import Sprite from "./components/entities/Sprite.js";

export const GRAVITY = 0.2;
export const canvas =
  document.querySelector("canvas") || new HTMLCanvasElement();
export const context =
  canvas.getContext("2d") || new CanvasRenderingContext2D();

class Game {
  private player: Sprite;
  private enemy: Sprite;

  constructor() {
    this.initCanvasSize();
    this.fillBackground();

    this.player = new Sprite({
      position: { x: 100, y: 100 },
      velocity: { x: 0, y: 10 },
    });

    this.enemy = new Sprite({
      position: { x: 400, y: 100 },
      velocity: { x: 0, y: 0 },
    });

    this.animate();
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

    this.player.update();
    this.enemy.update();
  }
}

new Game();
