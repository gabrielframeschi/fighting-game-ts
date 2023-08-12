import { canvas, context, GRAVITY } from "../../main.js";
var Player = /** @class */ (function () {
    function Player(_a) {
        var color = _a.color, lastKey = _a.lastKey, offset = _a.offset, position = _a.position, velocity = _a.velocity;
        this.height = 150;
        this.width = 50;
        this.isAttacking = false;
        this.health = 100;
        this.position = position;
        this.velocity = velocity;
        this.lastKey = lastKey;
        this.color = color;
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: offset,
            height: 50,
            width: 100,
        };
    }
    Player.prototype.draw = function () {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        // hitbox
        if (this.isAttacking) {
            context.fillStyle = "cyan";
            context.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
        }
    };
    Player.prototype.update = function () {
        this.draw();
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
        this.hitBox.position.y = this.position.y + this.hitBox.offset.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >=
            canvas.height - 95) {
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
}());
export default Player;
