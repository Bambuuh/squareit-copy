var Square = (function () {
    function Square(x, y, squareSize, color) {
        this.position = { x: 0, y: 0 };
        this.position.x = x;
        this.position.y = y;
        this.color = color;
        this.squareSize = squareSize;
    }
    Square.prototype.getPosition = function () {
        return this.position;
    };
    Square.prototype.getColor = function () {
        return this.color;
    };
    Square.prototype.setColor = function (color) {
        this.color = color;
    };
    return Square;
}());
//# sourceMappingURL=square.js.map