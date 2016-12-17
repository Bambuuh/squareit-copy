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
        this.position.x -= squareSize;
    };
    PlayerSquare.prototype.moveRight = function (squareSize) {
        this.position.x += squareSize;
    };
    PlayerSquare.prototype.moveUp = function (squareSize) {
        this.position.y -= squareSize;
    };
    PlayerSquare.prototype.moveDown = function (squareSize) {
        this.position.y += squareSize;
    };
    return PlayerSquare;
}(Square));
//# sourceMappingURL=playerSquare.js.map