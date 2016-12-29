var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, squareSize, map, color) {
        var _this = _super.call(this, x, y, squareSize, color) || this;
        _this.rgb = {
            r: 209,
            g: 150,
            b: 0,
        };
        _this.map = map;
        return _this;
    }
    Player.prototype.getPosition = function () {
        return this.position;
    };
    Player.prototype.moveTo = function (direction) {
        var newPosition;
        if (direction === 'up') {
            newPosition = { x: this.getPosition().x, y: this.getPosition().y - this.squareSize };
        }
        else if (direction === 'right') {
            newPosition = { x: this.getPosition().x + this.squareSize, y: this.getPosition().y };
        }
        else if (direction === 'down') {
            newPosition = { x: this.getPosition().x, y: this.getPosition().y + this.squareSize };
        }
        else if (direction === 'left') {
            newPosition = { x: this.getPosition().x - this.squareSize, y: this.getPosition().y };
        }
        return this.move(newPosition);
    };
    Player.prototype.move = function (newPosition) {
        var nextTile = this.getCollidingTile(newPosition);
        if (nextTile.canVisit()) {
            this.position.y = newPosition.y;
            this.position.x = newPosition.x;
            nextTile.visit(this.getColor());
            if (nextTile.isTeleporter()) {
                var teleportTile = this.getTeleportTile(nextTile);
                var teleportPosition = {
                    x: teleportTile.getPosition().x,
                    y: teleportTile.getPosition().y,
                };
                return {
                    tile: teleportTile,
                    position: teleportPosition,
                };
            }
        }
    };
    Player.prototype.teleportTo = function (position, tile) {
        this.position.x = position.x;
        this.position.y = position.y;
        tile.visit(this.getColor());
    };
    Player.prototype.getCollidingTile = function (position) {
        var _this = this;
        return this.map.filter(function (tile) { return _this.isCollidingTile(position, tile); })[0];
    };
    Player.prototype.isCollidingTile = function (position, tile) {
        return tile.getPosition().x === position.x && tile.getPosition().y === position.y;
    };
    Player.prototype.getTeleportTile = function (nextTile) {
        return this.map.filter(function (tile) { return tile.isTeleporter() && (tile.getPosition().x !== nextTile.getPosition().x || tile.getPosition().y !== nextTile.getPosition().y); })[0];
    };
    Player.prototype.generateShade = function () {
        var max = 200;
        var min = 150;
        this.rgb.g = Math.floor(Math.random() * (max - min + 1)) + min;
        this.color = "rgb(" + this.rgb.r + ", " + this.rgb.g + ", " + this.rgb.b + ")";
    };
    return Player;
}(Square));
//# sourceMappingURL=player.js.map