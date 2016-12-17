class FieldSquare extends Square {

    private visited = false;
    private teleporter = false;

    constructor(x: number, y: number, empty = false) {
        super(x, y);
    }
}
