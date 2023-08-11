import { canvas, context, GRAVITY } from "../../main.js";

type Coordinates = { x: number; y: number };

interface ISpriteProps {
  position: Coordinates;
  velocity: Coordinates;
}

export default class Sprite {
  position: Coordinates;
  velocity: Coordinates;
  height: number;

  constructor({ position, velocity }: ISpriteProps) {
    this.height = 150;
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      return;
    }

    this.velocity.y += GRAVITY;
  }
}
