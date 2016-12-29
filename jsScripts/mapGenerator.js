var MapGenerator = (function () {
    function MapGenerator() {
        var _this = this;
        this.mapOne = [
            [9, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 1, 0],
            [0, 2, 2, 2],
            [0, 0, 1, 0],
            [0, 0, 9, 0],
        ];
        this.mapTwo = [
            [2, 0, 0, 2],
            [9, 0, 0, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
            [9, 2, 0, 0],
            [0, 0, 0, 0],
        ];
        this.mapThree = [
            [2, 0, 1, 0],
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [1, 0, 0, 0],
            [0, 9, 0, 0],
            [0, 9, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
        ];
        this.maps = [this.mapOne, this.mapTwo, this.mapThree];
        this.generateMap = function (squareSize, map) {
            var mapTiles = [];
            var startPositions = [];
            map.forEach(function (row, i) {
                row.forEach(function (type, j) {
                    var newTile = new Tile(j * squareSize, i * squareSize, squareSize, type, _this.getTileColor(type));
                    mapTiles.push(newTile);
                    if (type === 9) {
                        startPositions.push({ x: newTile.getPosition().x, y: newTile.getPosition().y });
                    }
                });
            });
            return {
                startPositions: startPositions,
                tiles: mapTiles,
                dimensions: {
                    width: map[0].length * squareSize,
                    height: map.length * squareSize,
                }
            };
        };
    }
    MapGenerator.prototype.generateMapByIndex = function (squareSize, index) {
        return this.generateMap(squareSize, this.maps[index]);
    };
    MapGenerator.prototype.getMaps = function (squareSize) {
        var _this = this;
        return this.maps.map(function (map) { return _this.generateMap(squareSize, map); });
    };
    MapGenerator.prototype.getTileColor = function (type) {
        switch (type) {
            case 2:
                return '#ffffe5';
            default:
                return 'black';
        }
    };
    return MapGenerator;
}());
//# sourceMappingURL=mapGenerator.js.map