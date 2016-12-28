var MapGenerator = (function () {
    function MapGenerator() {
        var _this = this;
        this.playField = [
            [9, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 1, 0],
            [0, 2, 2, 2],
            [0, 0, 1, 0],
            [0, 0, 9, 0],
        ];
        this.generateMap = function (squareSize, settings) {
            var mapTiles = [];
            var startPositions = [];
            _this.playField.forEach(function (row, i) {
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
            };
        };
    }
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