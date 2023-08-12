import { canvas, context, GRAVITY } from "../../main.js";

type Coordinates = { x: number; y: number };

type HitBox = {
  position: Coordinates;
  offset: Coordinates;
  height: number;
  width: number;
};

interface ISpriteProps {
  position: Coordinates;
  velocity: Coordinates;
  lastKey: string;
  color: string;
  offset: Coordinates;
}

export default class Sprite {
  height = 150;
  width = 50;
  isAttacking = false;

  hitBox: HitBox;
  position: Coordinates;
  velocity: Coordinates;
  lastKey: string;
  color: string;

  constructor({ color, lastKey, offset, position, velocity }: ISpriteProps) {
    this.position = position;
    this.velocity = velocity;
    this.lastKey = lastKey;
    this.color = color;

    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      height: 50,
      width: 100,
    };
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    // hitbox
    if (this.isAttacking) {
      context.fillStyle = "cyan";
      context.fillRect(
        this.hitBox.position.x,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      );
    }
  }

  update() {
    this.draw();
    this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y + this.hitBox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      return;
    }

    this.velocity.y += GRAVITY;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
