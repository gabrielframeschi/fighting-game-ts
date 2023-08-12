import Sprite from "./components/entities/Sprite.js";
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
        this.player = new Sprite({
            position: { x: 100, y: 100 },
            velocity: { x: 0, y: 10 },
            lastKey: "",
        });
        this.enemy = new Sprite({
            position: { x: 400, y: 100 },
            velocity: { x: 0, y: 0 },
            lastKey: "",
        });
        this.animate();
        this.handleKeyInput();
    }
    Game.prototype.initCanvasSize = function () {
        canvas.width = 1024;
        canvas.height = 576;
    };
    Game.prototype.fillBackground = function () {
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
    Game.prototype.animate = function () {
        var _this = this;
        window.requestAnimationFrame(function () { return _this.animate(); });
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.controlMovement();
    };
    Game.prototype.handleKeyInput = function () {
        var _this = this;
        window.addEventListener("keydown", function (event) {
            // player 1 control
            switch (event.key) {
                case "a":
                    keys.a.pressed = true;
                    _this.player.lastKey = "a";
                    break;
                case "d":
                    keys.d.pressed = true;
                    _this.player.lastKey = "d";
                    break;
                case "w":
                    if (_this.player.velocity.y <= 5)
                        _this.player.velocity.y = -20;
                    break;
            }
            // player 2 (enemy) control
            switch (event.key) {
                case "ArrowLeft":
                    keys.ArrowLeft.pressed = true;
                    _this.enemy.lastKey = "ArrowLeft";
                    break;
                case "ArrowRight":
                    keys.ArrowRight.pressed = true;
                    _this.enemy.lastKey = "ArrowRight";
                    break;
                case "ArrowUp":
                    if (_this.enemy.velocity.y <= 5)
                        _this.enemy.velocity.y = -20;
                    break;
            }
        });
        window.addEventListener("keyup", function (event) {
            // player 1 control
            switch (event.key) {
                case "a":
                    keys.a.pressed = false;
                    break;
                case "d":
                    keys.d.pressed = false;
                    break;
            }
            // player 2 (enemy) control
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
        this.player.update();
        this.enemy.update();
        this.player.velocity.x = 0;
        this.enemy.velocity.x = 0;
        if (keys.a.pressed && this.player.lastKey === "a")
            this.player.velocity.x = -5;
        if (keys.d.pressed && this.player.lastKey === "d")
            this.player.velocity.x = 5;
        if (keys.ArrowLeft.pressed && this.enemy.lastKey === "ArrowLeft")
            this.enemy.velocity.x = -5;
        if (keys.ArrowRight.pressed && this.enemy.lastKey === "ArrowRight")
            this.enemy.velocity.x = 5;
    };
    return Game;
}());
new Game();
