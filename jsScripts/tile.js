var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(x, y, squareSize, type, color) {
        var _this = _super.call(this, x, y, squareSize, color) || this;
        _this.visited = false;
        _this.teleporter = false;
        _this.empty = false;
        switch (type) {
            case 1:
                _this.teleporter = true;
                break;
            case 2:
                _this.empty = true;
            default:
                break;
        }
        return _this;
    }
    Tile.prototype.visit = function (color) {
        this.setColor(color);
        this.visited = true;
    };
    Tile.prototype.canVisit = function () {
        return !this.visited && !this.empty;
    };
    Tile.prototype.isTeleporter = function () {
        return this.teleporter;
    };
    return Tile;
}(Square));
//# sourceMappingURL=tile.js.map