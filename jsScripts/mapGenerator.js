var MapGenerator = (function () {
    function MapGenerator() {
        var _this = this;
        this.playField = [
            [0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0],
            [0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 2],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ];
        this.generateMap = function (squareSize, settings) {
            var mapTiles = [];
            _this.playField.forEach(function (row, i) {
                row.forEach(function (type, j) {
                    mapTiles.push(new Tile(j * squareSize, i * squareSize, squareSize, type, _this.getTileColor(type)));
                });
            });
            return mapTiles;
        };
    }
    MapGenerator.prototype.getTileColor = function (type) {
        switch (type) {
            case 1:
                return 'green';
            case 2:
                return '#ffffe5';
            default:
                return 'black';
        }
    };
    return MapGenerator;
}());
//# sourceMappingURL=mapGenerator.js.map