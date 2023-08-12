import { context } from "../../main.js";

type Coordinates = { x: number; y: number };

interface ISpriteProps {
  position: Coordinates;
  imageSrc: string;
}

export default class Sprite {
  height = 150;
  width = 50;

  position: Coordinates;
  image: HTMLImageElement;

  constructor({ position, imageSrc }: ISpriteProps) {
    this.position = position;

    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}
