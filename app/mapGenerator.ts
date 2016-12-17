class MapGenerator {
    
    constructor() { }

    public generateMap(squareSize: number, settings: {empty: {x:number, y:number}[], teleporter?: {x: number, y: number}[]}) {
        const map: Square[][] = [];

        for (let i = 0; i < 5; i++) {
            const column = [];
            for (let j = 0; j < 7; j++) {
                column.push(new FieldSquare(i * squareSize, j * squareSize));
            }
            map.push(column);
        }

        return map;
    }

}