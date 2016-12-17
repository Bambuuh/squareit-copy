var Square = (function () {
    function Square(x, y) {
        this.color = 'black';
        this.position = { x: 0, y: 0 };
        this.position.x = x;
        this.position.y = y;
    }
    Square.prototype.getPosition = function () {
        return this.position;
    };
    Square.prototype.getColor = function () {
        return this.color;
    };
    return Square;
}());
//# sourceMappingURL=square.js.map