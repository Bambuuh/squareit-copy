var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerSquare = (function (_super) {
    __extends(PlayerSquare, _super);
    function PlayerSquare(x, y) {
        return _super.call(this, x, y) || this;
    }
    PlayerSquare.prototype.getPosition = function () {
        return this.position;
    };
    PlayerSquare.prototype.moveLeft = function (squareSize) {
        if (this.position.x - squareSize >= 0) {
            this.position.x -= squareSize;
        }
    };
    PlayerSquare.prototype.moveRight = function (squareSize, mapSize) {
        if (this.position.x < mapSize.width - squareSize) {
            this.position.x += squareSize;
        }
    };
    PlayerSquare.prototype.moveUp = function (squareSize) {
        if (this.position.y - squareSize >= 0) {
            this.position.y -= squareSize;
        }
    };
    PlayerSquare.prototype.moveDown = function (squareSize, mapSize) {
        if (this.position.y < mapSize.height - squareSize) {
            this.position.y += squareSize;
        }
    };
    return PlayerSquare;
}(Square));
//# sourceMappingURL=playerSquare.js.map