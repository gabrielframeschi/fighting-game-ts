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
        var lastKey = _a.lastKey, position = _a.position, velocity = _a.velocity, _b = _a.currentFrame, currentFrame = _b === void 0 ? 0 : _b, _c = _a.framesElapsed, framesElapsed = _c === void 0 ? 0 : _c, _d = _a.framesHold, framesHold = _d === void 0 ? 5 : _d, _e = _a.framesQuant, framesQuant = _e === void 0 ? 1 : _e, imageSrc = _a.imageSrc, _f = _a.scale, scale = _f === void 0 ? 1 : _f, _g = _a.offset, offset = _g === void 0 ? { x: 0, y: 0 } : _g, sprites = _a.sprites, hitBox = _a.hitBox;
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
        _this.dead = false;
        _this.velocity = velocity;
        _this.lastKey = lastKey;
        _this.sprites = sprites;
        _this.hitBox = {
            position: {
                x: _this.position.x,
                y: _this.position.y,
            },
            offset: hitBox.offset,
            height: hitBox.height,
            width: hitBox.width,
        };
        for (var sprite in _this.sprites) {
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
        return _this;
    }
    Player.prototype.update = function () {
        this.draw();
        if (!this.dead)
            this.animateFrames();
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
    };
    Player.prototype.attack = function () {
        this.isAttacking = true;
        this.switchSprite("attack1");
    };
    Player.prototype.takeHit = function () {
        this.health -= 10;
        if (this.health <= 0) {
            this.switchSprite("death");
            return;
        }
        this.switchSprite("takeHit");
    };
    Player.prototype.switchSprite = function (spriteKey) {
        if (this.image === this.sprites.death.image) {
            if (this.currentFrame === this.sprites.death.framesMax - 1)
                this.dead = true;
            return;
        }
        if (this.image === this.sprites.takeHit.image &&
            this.currentFrame < this.sprites.takeHit.framesMax - 1)
            return;
        if (this.image === this.sprites.attack1.image &&
            this.currentFrame < this.sprites.attack1.framesMax - 1)
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
    };
    return Player;
}(Sprite));
export default Player;
