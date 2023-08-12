import { context } from "../../main.js";
var Sprite = /** @class */ (function () {
    function Sprite(_a) {
        var position = _a.position, imageSrc = _a.imageSrc;
        this.height = 150;
        this.width = 50;
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    Sprite.prototype.draw = function () {
        context.drawImage(this.image, this.position.x, this.position.y);
    };
    Sprite.prototype.update = function () {
        this.draw();
    };
    return Sprite;
}());
export default Sprite;
