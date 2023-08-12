import Sprite from "./components/entities/Sprite.js";
import Player from "./components/entities/Player.js";
import { decreaseHealthBar } from "./components/ui/healthBar.js";
import { decreaseTimer, timer, timerId } from "./components/ui/timer.js";
import { updateMatchResultLabel } from "./components/ui/matchResultLabel.js";
export var GRAVITY = 0.7;
export var canvas = document.querySelector("canvas") || new HTMLCanvasElement();
export var context = canvas.getContext("2d") || new CanvasRenderingContext2D();
var keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
};
var Game = /** @class */ (function () {
    function Game() {
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
            color: "blue",
            imageSrc: "./assets/samuraiMack/Idle.png",
            framesQuant: 8,
            scale: 2.5,
            sprites: {
                idle: {
                    framesMax: 8,
                    imageSrc: "./assets/samuraiMack/Idle.png",
                    image: new Image(),
                },
                run: {
                    framesMax: 8,
                    imageSrc: "./assets/samuraiMack/Run.png",
                    image: new Image(),
                },
            },
        });
        this.player2 = new Player({
            position: { x: canvas.width - 200, y: 100 },
            velocity: { x: 0, y: 0 },
            offset: { x: -50, y: 0 },
            lastKey: "",
            color: "red",
            imageSrc: "./assets/samuraiMack/Idle.png",
            sprites: {
                idle: {
                    framesMax: 8,
                    imageSrc: "./assets/samuraiMack/Idle.png",
                    image: new Image(),
                },
            },
        });
        this.animate();
        this.handleKeyInput();
        decreaseTimer();
    }
    Game.prototype.initCanvasSize = function () {
        canvas.width = 1280;
        canvas.height = 576;
        56;
    };
    Game.prototype.fillBackground = function () {
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
    Game.prototype.animate = function () {
        var _this = this;
        var isMatchFinished = this.handleVictory();
        if (isMatchFinished) {
            clearInterval(timerId);
            return;
        }
        if (timer === 0) {
            this.handleTimerVictory();
            return;
        }
        window.requestAnimationFrame(function () { return _this.animate(); });
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.backgrond.update();
        this.shop.update();
        this.controlMovement();
        this.handleCollision();
    };
    Game.prototype.handleKeyInput = function () {
        var _this = this;
        window.addEventListener("keydown", function (event) {
            // player1 1 control
            switch (event.key) {
                case "a":
                    keys.a.pressed = true;
                    _this.player1.lastKey = "a";
                    break;
                case "d":
                    keys.d.pressed = true;
                    _this.player1.lastKey = "d";
                    break;
                case "w":
                    if (_this.player1.velocity.y === 0)
                        _this.player1.velocity.y = -20;
                    break;
                case " ":
                    _this.player1.attack();
                    break;
            }
            // player1 2 (player2) control
            switch (event.key) {
                case "ArrowLeft":
                    keys.ArrowLeft.pressed = true;
                    _this.player2.lastKey = "ArrowLeft";
                    break;
                case "ArrowRight":
                    keys.ArrowRight.pressed = true;
                    _this.player2.lastKey = "ArrowRight";
                    break;
                case "ArrowUp":
                    if (_this.player2.velocity.y === 0)
                        _this.player2.velocity.y = -20;
                    break;
                case "Enter":
                    _this.player2.attack();
                    break;
            }
        });
        window.addEventListener("keyup", function (event) {
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
    };
    Game.prototype.controlMovement = function () {
        this.player1.update();
        // this.player2.update();
        this.player1.velocity.x = 0;
        this.player1.image = this.player1.sprites.idle.image;
        this.player2.velocity.x = 0;
        if (keys.a.pressed && this.player1.lastKey === "a") {
            this.player1.velocity.x = -5;
            this.player1.image = this.player1.sprites.run.image;
        }
        if (keys.d.pressed && this.player1.lastKey === "d") {
            this.player1.velocity.x = 5;
            this.player1.image = this.player1.sprites.run.image;
        }
        if (keys.ArrowLeft.pressed && this.player2.lastKey === "ArrowLeft")
            this.player2.velocity.x = -5;
        if (keys.ArrowRight.pressed && this.player2.lastKey === "ArrowRight")
            this.player2.velocity.x = 5;
    };
    Game.prototype.detectCollision = function (_a) {
        var attacker = _a.attacker, defender = _a.defender;
        if (!attacker.isAttacking)
            return false;
        var collisionLeft = attacker.hitBox.position.x;
        var collisionRight = attacker.hitBox.position.x + attacker.hitBox.width;
        var collisionTop = attacker.hitBox.position.y;
        var collisionBottom = attacker.hitBox.position.y + attacker.hitBox.height;
        var defenderLeft = defender.position.x;
        var defenderRight = defender.position.x + defender.width;
        var defenderTop = defender.position.y;
        var defenderBottom = defender.position.y + defender.height;
        var isColliding = collisionLeft < defenderRight &&
            collisionRight > defenderLeft &&
            collisionTop < defenderBottom &&
            collisionBottom > defenderTop;
        return isColliding;
    };
    Game.prototype.handleCollision = function () {
        if (this.detectCollision({ attacker: this.player1, defender: this.player2 })) {
            this.player1.isAttacking = false;
            this.player2.health -= 10;
            decreaseHealthBar("player-2", this.player2.health);
        }
        if (this.detectCollision({ attacker: this.player2, defender: this.player1 })) {
            this.player2.isAttacking = false;
            this.player1.health -= 10;
            decreaseHealthBar("player-1", this.player1.health);
        }
    };
    Game.prototype.handleVictory = function () {
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
    };
    Game.prototype.handleTimerVictory = function () {
        if (this.player1.health === this.player1.health)
            updateMatchResultLabel("Tie!");
        if (this.player1.health > this.player2.health)
            updateMatchResultLabel("Player 1 Wins!");
        if (this.player1.health < this.player2.health)
            updateMatchResultLabel("Player 2 Wins!");
    };
    return Game;
}());
new Game();
