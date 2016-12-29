class MapGenerator {
    
    private mapOne = [
        [9, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 1, 0],
        [0, 2, 2, 2],
        [0, 0, 1, 0],
        [0, 0, 9, 0],
    ];

    private mapTwo = [
        [2, 0, 0, 2],
        [9, 0, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0],
        [9, 2, 0, 0],
        [0, 0, 0, 0],
    ];

    private mapThree = [
        [2, 0, 1, 0],
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [1, 0, 0, 0],
        [0, 9, 0, 0],
        [0, 9, 0, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
    ]

    private maps = [this.mapOne, this.mapTwo, this.mapThree];

    private currentMap: Tile[][];

    constructor() { }

    public generateMapByIndex(squareSize: number, index: number) {
        return this.generateMap(squareSize, this.maps[index]);
    }

    public getMaps(squareSize: number) {
        return this.maps.map(map => this.generateMap(squareSize, map));
    }

    public generateMap = (squareSize: number, map: number[][]) => {
        const mapTiles: Tile[] = [];
        const startPositions: { x: number, y: number }[] = []
        map.forEach((row, i) => {
            row.forEach((type, j) => {
                const newTile = new Tile(j * squareSize, i * squareSize, squareSize, type, this.getTileColor(type));
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
        }
    }

    private getTileColor(type: number) {
        switch (type) {
            case 2:
                return '#ffffe5';
            default:
                return 'black';
        }
    }
}