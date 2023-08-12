import { context } from "../../main.js";
var Sprite = /** @class */ (function () {
    function Sprite(_a) {
        var _b = _a.currentFrame, currentFrame = _b === void 0 ? 0 : _b, _c = _a.framesElapsed, framesElapsed = _c === void 0 ? 0 : _c, _d = _a.framesHold, framesHold = _d === void 0 ? 5 : _d, _e = _a.framesQuant, framesQuant = _e === void 0 ? 1 : _e, imageSrc = _a.imageSrc, position = _a.position, _f = _a.scale, scale = _f === void 0 ? 1 : _f, _g = _a.offset, offset = _g === void 0 ? { x: 0, y: 0 } : _g;
        this.height = 150;
        this.width = 50;
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
    Sprite.prototype.draw = function () {
        context.drawImage(this.image, this.currentFrame * (this.image.width / this.framesQuant), 0, this.image.width / this.framesQuant, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y, (this.image.width / this.framesQuant) * this.scale, this.image.height * this.scale);
    };
    Sprite.prototype.update = function () {
        this.draw();
        this.animateFrames();
    };
    Sprite.prototype.animateFrames = function () {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold != 0)
            return;
        if (this.currentFrame < this.framesQuant - 1) {
            this.currentFrame++;
            return;
        }
        this.currentFrame = 0;
    };
    return Sprite;
}());
export default Sprite;
