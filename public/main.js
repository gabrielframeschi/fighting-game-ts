import Sprite from "./components/entities/Sprite.js";
export var GRAVITY = 0.2;
export var canvas = document.querySelector("canvas") || new HTMLCanvasElement();
export var context = canvas.getContext("2d") || new CanvasRenderingContext2D();
var Game = /** @class */ (function () {
    function Game() {
        this.initCanvasSize();
        this.fillBackground();
        this.player = new Sprite({
            position: { x: 100, y: 100 },
            velocity: { x: 0, y: 10 },
        });
        this.enemy = new Sprite({
            position: { x: 400, y: 100 },
            velocity: { x: 0, y: 0 },
        });
        this.animate();
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
        this.player.update();
        this.enemy.update();
    };
    return Game;
}());
new Game();
