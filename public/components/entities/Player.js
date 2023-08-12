var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { canvas, GRAVITY } from "../../main.js";
import Sprite from "./Sprite.js";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(_a) {
        var color = _a.color, lastKey = _a.lastKey, position = _a.position, velocity = _a.velocity, _b = _a.currentFrame, currentFrame = _b === void 0 ? 0 : _b, _c = _a.framesElapsed, framesElapsed = _c === void 0 ? 0 : _c, _d = _a.framesHold, framesHold = _d === void 0 ? 5 : _d, _e = _a.framesQuant, framesQuant = _e === void 0 ? 1 : _e, imageSrc = _a.imageSrc, _f = _a.scale, scale = _f === void 0 ? 1 : _f, _g = _a.offset, offset = _g === void 0 ? { x: 0, y: 0 } : _g;
        var _this = _super.call(this, {
            imageSrc: imageSrc,
            position: position,
            currentFrame: currentFrame,
            framesElapsed: framesElapsed,
            framesHold: framesHold,
            framesQuant: framesQuant,
            scale: scale,
            offset: offset,
        }) || this;
        _this.height = 150;
        _this.width = 50;
        _this.isAttacking = false;
        _this.health = 100;
        _this.velocity = velocity;
        _this.lastKey = lastKey;
        _this.color = color;
        _this.hitBox = {
            position: {
                x: _this.position.x,
                y: _this.position.y,
            },
            offset: offset,
            height: 50,
            width: 100,
        };
        return _this;
    }
    Player.prototype.update = function () {
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
    };
    Player.prototype.attack = function () {
        var _this = this;
        this.isAttacking = true;
        setTimeout(function () {
            _this.isAttacking = false;
        }, 100);
    };
    return Player;
}(Sprite));
export default Player;
