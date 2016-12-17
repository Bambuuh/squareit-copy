var MapGenerator = (function () {
    function MapGenerator() {
    }
    MapGenerator.prototype.generateMap = function (squareSize, settings) {
        var map = [];
        for (var i = 0; i < 5; i++) {
            var column = [];
            for (var j = 0; j < 7; j++) {
                column.push(new FieldSquare(i * squareSize, j * squareSize));
            }
            map.push(column);
        }
        return map;
    };
    return MapGenerator;
}());
//# sourceMappingURL=mapGenerator.js.map