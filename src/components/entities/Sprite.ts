import { context } from "../../main.js";

type Coordinates = { x: number; y: number };

export interface ISpriteProps {
  position: Coordinates;
  imageSrc: string;
  scale?: number;
  framesQuant?: number;
  currentFrame?: number;
  framesElapsed?: number;
  framesHold?: number;
  offset?: Coordinates;
}

export default class Sprite {
  height = 150;
  width = 50;

  position: Coordinates;
  image: HTMLImageElement;
  scale: number;
  framesQuant: number;
  currentFrame: number;
  framesElapsed: number;
  framesHold: number;
  offset: Coordinates;

  constructor({
    currentFrame = 0,
    framesElapsed = 0,
    framesHold = 5,
    framesQuant = 1,
    imageSrc,
    position,
    scale = 1,
    offset = { x: 0, y: 0 },
  }: ISpriteProps) {
    this.position = position;

    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesQuant = framesQuant;
    this.currentFrame = currentFrame;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
    this.offset = offset;
  }

  draw() {
    context.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.framesQuant),
      0,
      this.image.width / this.framesQuant,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesQuant) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.animateFrames();
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold != 0) return;

    if (this.currentFrame < this.framesQuant - 1) {
      this.currentFrame++;
      return;
    }

    this.currentFrame = 0;
  }
}
