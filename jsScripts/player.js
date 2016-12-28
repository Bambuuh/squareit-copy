var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, squareSize, map, color) {
        var _this = _super.call(this, x, y, squareSize, color) || this;
        _this.map = map;
        return _this;
    }
    Player.prototype.getPosition = function () {
        return this.position;
    };
    Player.prototype.moveLeft = function () {
        var newPosition = {
            x: this.getPosition().x - this.squareSize,
            y: this.getPosition().y,
        };
        if (!this.isColliding(newPosition)) {
            this.position.x = newPosition.x;
            return true;
        }
        return false;
    };
    Player.prototype.moveRight = function () {
        var newPosition = {
            x: this.getPosition().x + this.squareSize,
            y: this.getPosition().y,
        };
        if (!this.isColliding(newPosition)) {
            this.position.x = newPosition.x;
            return true;
        }
        return false;
    };
    Player.prototype.moveUp = function () {
        var newPosition = {
            x: this.getPosition().x,
            y: this.getPosition().y - this.squareSize,
        };
        if (!this.isColliding(newPosition)) {
            this.position.y = newPosition.y;
            return true;
        }
        return false;
    };
    Player.prototype.moveDown = function () {
        var newPosition = {
            x: this.getPosition().x,
            y: this.getPosition().y + this.squareSize,
        };
        if (!this.isColliding(newPosition)) {
            this.position.y = newPosition.y;
            return true;
        }
        return false;
    };
    Player.prototype.isColliding = function (position) {
        var _this = this;
        return this.map.some(function (tile) { return _this.isCollidingTile(position, tile) && !tile.canVisit(); });
    };
    Player.prototype.isCollidingTile = function (position, tile) {
        return tile.getPosition().x === position.x && tile.getPosition().y === position.y;
    };
    return Player;
}(Square));
//# sourceMappingURL=player.js.map