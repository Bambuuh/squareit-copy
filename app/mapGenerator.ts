class MapGenerator {
    
    private playField = [
        [0, 0, 0, 0, 0],
        [0, 2, 2, 0, 0],
        [0, 2, 2, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    private currentMap: Tile[][];

    constructor() { }

    public generateMap = (squareSize: number, settings: {empty: {x:number, y:number}[], teleporter?: {x: number, y: number}[]}) => {
        const mapTiles: Tile[] = [];
        this.playField.forEach((row, i) => {
            row.forEach((type, j) => {
                mapTiles.push(new Tile(j * squareSize, i * squareSize, squareSize, type, this.getTileColor(type)));
            })
        });

        return mapTiles
    }

    private getTileColor(type: number) {
        switch (type) {
            case 1:
                return 'green';
            case 2:
                return '#ffffe5';
            default:
                return 'black';
        }
    }
}