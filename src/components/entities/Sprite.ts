import { context } from "../../main.js";

type Coordinates = { x: number; y: number };

interface ISpriteProps {
  position: Coordinates;
  imageSrc: string;
  scale?: number;
  framesQuant?: number;
  currentFrame?: number;
  framesElapsed?: number;
  framesHold?: number;
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

  constructor({
    currentFrame = 0,
    framesElapsed = 0,
    framesHold = 5,
    framesQuant = 1,
    imageSrc,
    position,
    scale = 1,
  }: ISpriteProps) {
    this.position = position;

    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesQuant = framesQuant;
    this.currentFrame = currentFrame;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
  }

  draw() {
    context.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.framesQuant),
      0,
      this.image.width / this.framesQuant,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.framesQuant) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold != 0) return;

    if (this.currentFrame < this.framesQuant - 1) {
      this.currentFrame++;
      return;
    }

    this.currentFrame = 0;
  }
}
