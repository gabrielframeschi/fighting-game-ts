import { canvas, context, GRAVITY } from "../../main.js";
var Sprite = /** @class */ (function () {
    function Sprite(_a) {
        var position = _a.position, velocity = _a.velocity;
        this.height = 150;
        this.position = position;
        this.velocity = velocity;
    }
    Sprite.prototype.draw = function () {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, 50, 150);
    };
    Sprite.prototype.update = function () {
        this.draw();
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
            return;
        }
        this.velocity.y += GRAVITY;
    };
    return Sprite;
}());
export default Sprite;
