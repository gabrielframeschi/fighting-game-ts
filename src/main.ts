import Sprite from "./components/entities/Sprite.js";
import Player from "./components/entities/Player.js";
import { decreaseHealthBar } from "./components/ui/healthBar.js";
import { decreaseTimer, timer, timerId } from "./components/ui/timer.js";
import { updateMatchResultLabel } from "./components/ui/matchResultLabel.js";

export const GRAVITY = 0.7;
export const canvas =
  document.querySelector("canvas") || new HTMLCanvasElement();
export const context =
  canvas.getContext("2d") || new CanvasRenderingContext2D();

interface DettectColisionProps {
  attacker: Player;
  defender: Player;
  attackFrame: number;
}

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

class Game {
  private player1: Player;
  private player2: Player;
  private backgrond: Sprite;
  private shop: Sprite;

  constructor() {
    this.initCanvasSize();
    this.fillBackground();

    this.backgrond = new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: "./assets/background.png",
    });

    this.shop = new Sprite({
      position: { x: 630, y: 127 },
      imageSrc: "./assets/shop.png",
      scale: 2.75,
      framesQuant: 6,
    });

    this.player1 = new Player({
      position: { x: 200, y: 100 },
      velocity: { x: 0, y: 10 },
      offset: { x: 215, y: 155 },
      lastKey: "",
      imageSrc: "./assets/samuraiMack/Idle.png",
      framesQuant: 8,
      scale: 2.5,
      sprites: {
        idle: this.createSprite(8, "./assets/samuraiMack/Idle.png"),
        run: this.createSprite(8, "./assets/samuraiMack/Run.png"),
        jump: this.createSprite(2, "./assets/samuraiMack/Jump.png"),
        fall: this.createSprite(2, "./assets/samuraiMack/Fall.png"),
        attack1: this.createSprite(6, "./assets/samuraiMack/Attack1.png"),
        takeHit: this.createSprite(4, "./assets/samuraiMack/Take Hit.png"),
        death: this.createSprite(6, "./assets/samuraiMack/Death.png"),
      },
      hitBox: {
        position: { x: 0, y: 0 },
        offset: { x: 100, y: 50 },
        height: 50,
        width: 150,
      },
    });

    this.player2 = new Player({
      position: { x: canvas.width - 220, y: 100 },
      velocity: { x: 0, y: 0 },
      offset: { x: 215, y: 170 },
      lastKey: "",
      imageSrc: "./assets/kenji/Idle.png",
      framesQuant: 4,
      scale: 2.5,
      sprites: {
        idle: this.createSprite(4, "./assets/kenji/Idle.png"),
        run: this.createSprite(8, "./assets/kenji/Run.png"),
        jump: this.createSprite(2, "./assets/kenji/Jump.png"),
        fall: this.createSprite(2, "./assets/kenji/Fall.png"),
        attack1: this.createSprite(4, "./assets/kenji/Attack1.png"),
        takeHit: this.createSprite(4, "./assets/kenji/Take Hit.png"),
        death: this.createSprite(7, "./assets/kenji/Death.png"),
      },
      hitBox: {
        position: { x: 0, y: 0 },
        offset: { x: -180, y: 50 },
        height: 50,
        width: 160,
      },
    });

    this.animate();
    this.handleKeyInput();

    decreaseTimer();
  }

  private initCanvasSize(): void {
    canvas.width = 1280;
    canvas.height = 576;
    56;
  }

  private fillBackground() {
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  private animate() {
    const isMatchFinished = this.handleVictory();
    if (isMatchFinished) {
      clearInterval(timerId);
    }

    if (timer === 0) {
      this.handleTimerVictory();
      return;
    }

    window.requestAnimationFrame(() => this.animate());

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    this.backgrond.update();
    this.shop.update();

    // adds white overlay between background and players
    context.fillStyle = "rgba(255, 255, 255, 0.15)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    this.controlMovement();

    this.handleCollision();
  }

  private handleKeyInput() {
    window.addEventListener("keydown", (event) => {
      if (
        !this.player1.dead &&
        this.player1.image !== this.player1.sprites.death.image
      ) {
        switch (event.key) {
          case "a":
            keys.a.pressed = true;
            this.player1.lastKey = "a";
            break;
          case "d":
            keys.d.pressed = true;
            this.player1.lastKey = "d";
            break;
          case "w":
            if (this.player1.velocity.y === 0) this.player1.velocity.y = -20;
            break;
          case " ":
            this.player1.attack();
            break;
        }
      }

      if (
        !this.player2.dead &&
        this.player2.image !== this.player2.sprites.death.image
      ) {
        switch (event.key) {
          case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            this.player2.lastKey = "ArrowLeft";
            break;
          case "ArrowRight":
            keys.ArrowRight.pressed = true;
            this.player2.lastKey = "ArrowRight";
            break;
          case "ArrowUp":
            if (this.player2.velocity.y === 0) this.player2.velocity.y = -20;
            break;
          case "Enter":
            this.player2.attack();
            break;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      // player1 1 control
      switch (event.key) {
        case "a":
          keys.a.pressed = false;
          break;
        case "d":
          keys.d.pressed = false;
          break;
      }

      // player1 2 (player2) control
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
    this.player1.update();
    this.player2.update();

    this.player1.velocity.x = 0;
    this.player2.velocity.x = 0;

    if (keys.a.pressed && this.player1.lastKey === "a") {
      this.player1.velocity.x = -5;
      this.player1.switchSprite("run");
    }

    if (keys.d.pressed && this.player1.lastKey === "d") {
      this.player1.velocity.x = 5;
      this.player1.switchSprite("run");
    }

    if (!keys.a.pressed && !keys.d.pressed) this.player1.switchSprite("idle");

    if (this.player1.velocity.y < 0) {
      this.player1.switchSprite("jump");
    }

    if (this.player1.velocity.y > 0) {
      this.player1.switchSprite("fall");
    }

    if (keys.ArrowLeft.pressed && this.player2.lastKey === "ArrowLeft") {
      this.player2.velocity.x = -5;
      this.player2.switchSprite("run");
    }

    if (keys.ArrowRight.pressed && this.player2.lastKey === "ArrowRight") {
      this.player2.velocity.x = 5;
      this.player2.switchSprite("run");
    }

    if (!keys.ArrowLeft.pressed && !keys.ArrowRight.pressed)
      this.player2.switchSprite("idle");

    if (this.player2.velocity.y < 0) {
      this.player2.switchSprite("jump");
    }

    if (this.player2.velocity.y > 0) {
      this.player2.switchSprite("fall");
    }
  }

  private detectCollision({
    attacker,
    defender,
    attackFrame,
  }: DettectColisionProps) {
    if (!attacker.isAttacking) return false;

    const collisionLeft = attacker.hitBox.position.x;
    const collisionRight = attacker.hitBox.position.x + attacker.hitBox.width;
    const collisionTop = attacker.hitBox.position.y;
    const collisionBottom = attacker.hitBox.position.y + attacker.hitBox.height;

    const defenderLeft = defender.position.x;
    const defenderRight = defender.position.x + defender.width;
    const defenderTop = defender.position.y;
    const defenderBottom = defender.position.y + defender.height;

    const isColliding =
      collisionLeft < defenderRight &&
      collisionRight > defenderLeft &&
      collisionTop < defenderBottom &&
      collisionBottom > defenderTop &&
      attacker.currentFrame === attackFrame;

    return isColliding;
  }

  private handleCollision() {
    if (
      this.detectCollision({
        attacker: this.player1,
        defender: this.player2,
        attackFrame: 4,
      })
    ) {
      this.player1.isAttacking = false;

      this.player2.takeHit();
      decreaseHealthBar("player-2", this.player2.health);
    }

    if (this.player1.isAttacking && this.player1.currentFrame === 4)
      this.player1.isAttacking = false;

    if (
      this.detectCollision({
        attacker: this.player2,
        defender: this.player1,
        attackFrame: 2,
      })
    ) {
      this.player2.isAttacking = false;

      this.player1.takeHit();
      decreaseHealthBar("player-1", this.player1.health);
    }

    if (this.player2.isAttacking && this.player2.currentFrame === 2)
      this.player2.isAttacking = false;
  }

  private handleVictory(): boolean {
    if (this.player1.health === 0 && this.player2.health === 0) {
      updateMatchResultLabel("Tie!");
      return true;
    }

    if (this.player2.health === 0) {
      updateMatchResultLabel("Player 1 Wins!");
      return true;
    }

    if (this.player1.health === 0) {
      updateMatchResultLabel("Player 2 Wins!");
      return true;
    }

    return false;
  }

  private handleTimerVictory() {
    if (this.player1.health === this.player1.health)
      updateMatchResultLabel("Tie!");

    if (this.player1.health > this.player2.health)
      updateMatchResultLabel("Player 1 Wins!");

    if (this.player1.health < this.player2.health)
      updateMatchResultLabel("Player 2 Wins!");
  }

  private createSprite(framesMax: number, imageSrc: string) {
    return {
      framesMax,
      imageSrc,
      image: new Image(),
    };
  }
}

new Game();
