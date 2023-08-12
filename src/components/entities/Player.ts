import { canvas, GRAVITY } from "../../main.js";
import Sprite, { ISpriteProps } from "./Sprite.js";

type Coordinates = { x: number; y: number };

type Sprites = {
  [key: string]: {
    imageSrc: string;
    framesMax: number;
    image: HTMLImageElement;
  };
};

type HitBox = {
  position: Coordinates;
  offset: Coordinates;
  height: number;
  width: number;
};

interface IPlayerProps extends ISpriteProps {
  position: Coordinates;
  velocity: Coordinates;
  lastKey: string;
  color: string;
  offset: Coordinates;
  sprites: Sprites;
}

export default class Player extends Sprite {
  height = 150;
  width = 50;
  isAttacking = false;
  health = 100;

  hitBox: HitBox;
  velocity: Coordinates;
  lastKey: string;
  color: string;
  sprites: Sprites;

  constructor({
    color,
    lastKey,
    position,
    velocity,
    currentFrame = 0,
    framesElapsed = 0,
    framesHold = 5,
    framesQuant = 1,
    imageSrc,
    scale = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }: IPlayerProps) {
    super({
      imageSrc,
      position,
      currentFrame,
      framesElapsed,
      framesHold,
      framesQuant,
      scale,
      offset,
    });

    this.velocity = velocity;
    this.lastKey = lastKey;
    this.color = color;
    this.sprites = sprites;

    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      height: 50,
      width: 100,
    };

    for (let sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();

    this.animateFrames();

    this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y + this.hitBox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
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
