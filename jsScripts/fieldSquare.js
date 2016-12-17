var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FieldSquare = (function (_super) {
    __extends(FieldSquare, _super);
    function FieldSquare(x, y, empty) {
        if (empty === void 0) { empty = false; }
        var _this = _super.call(this, x, y) || this;
        _this.visited = false;
        _this.teleporter = false;
        return _this;
    }
    return FieldSquare;
}(Square));
//# sourceMappingURL=fieldSquare.js.map