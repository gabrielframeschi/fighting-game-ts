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
  offset: Coordinates;
  sprites: Sprites;
  hitBox: HitBox;
}

export default class Player extends Sprite {
  height = 150;
  width = 50;
  isAttacking = false;
  health = 100;
  dead = false;

  hitBox: HitBox;
  velocity: Coordinates;
  lastKey: string;
  sprites: Sprites;

  constructor({
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
    hitBox,
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
    this.sprites = sprites;

    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: hitBox.offset,
      height: hitBox.height,
      width: hitBox.width,
    };

    for (let sprite in this.sprites) {
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();

    if (!this.dead) this.animateFrames();

    this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y + this.hitBox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0;
      this.position.y = 331;
      return;
    }

    this.velocity.y += GRAVITY;
  }

  attack() {
    this.isAttacking = true;
    this.switchSprite("attack1");
  }

  takeHit() {
    this.health -= 10;

    if (this.health <= 0) {
      this.switchSprite("death");
      return;
    }

    this.switchSprite("takeHit");
  }

  switchSprite(spriteKey: string) {
    if (this.image === this.sprites.death.image) {
      if (this.currentFrame === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }

    if (
      this.image === this.sprites.takeHit.image &&
      this.currentFrame < this.sprites.takeHit.framesMax - 1
    )
      return;

    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.framesMax - 1
    )
      return;

    switch (spriteKey) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesQuant = this.sprites.idle.framesMax;
          this.currentFrame = 0;
        }
        break;

      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesQuant = this.sprites.run.framesMax;
          this.currentFrame = 0;
        }
        break;

      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesQuant = this.sprites.jump.framesMax;
          this.currentFrame = 0;
        }
        break;

      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesQuant = this.sprites.fall.framesMax;
          this.currentFrame = 0;
        }
        break;

      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesQuant = this.sprites.attack1.framesMax;
          this.currentFrame = 0;
        }
        break;

      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesQuant = this.sprites.takeHit.framesMax;
          this.currentFrame = 0;
        }
        break;

      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesQuant = this.sprites.death.framesMax;
          this.currentFrame = 0;
        }
        break;

      default:
        this.image = this.sprites.idle.image;
        this.framesQuant = this.sprites.idle.framesMax;
    }
  }
}
