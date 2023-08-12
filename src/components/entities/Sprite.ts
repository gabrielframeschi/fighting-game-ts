import { canvas, context, GRAVITY } from "../../main.js";

type Coordinates = { x: number; y: number };

interface ISpriteProps {
  position: Coordinates;
  velocity: Coordinates;
  lastKey: string;
}

export default class Sprite {
  private height = 150;

  position: Coordinates;
  velocity: Coordinates;
  lastKey: string;

  constructor({ lastKey, position, velocity }: ISpriteProps) {
    this.position = position;
    this.velocity = velocity;
    this.lastKey = lastKey;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      return;
    }

    this.velocity.y += GRAVITY;
  }
}
