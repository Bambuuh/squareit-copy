class MapGenerator {
    
    private playField = [
        [9, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 1, 0],
        [0, 2, 2, 2],
        [0, 0, 1, 0],
        [0, 0, 9, 0],
    ];

    private currentMap: Tile[][];

    constructor() { }

    public generateMap = (squareSize: number, settings: {empty: {x:number, y:number}[], teleporter?: {x: number, y: number}[]}) => {
        const mapTiles: Tile[] = [];
        const startPositions: { x: number, y: number }[] = []
        this.playField.forEach((row, i) => {
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