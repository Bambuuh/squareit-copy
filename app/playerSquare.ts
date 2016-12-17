class PlayerSquare extends Square {

    constructor(x: number, y: number) {
        super(x, y)
    }

    public getPosition() {
        return this.position;
    }

    public moveLeft(squareSize: number) {
        this.position.x -= squareSize;
    }
    public moveRight(squareSize: number) {
        this.position.x += squareSize;
    }

    public moveUp(squareSize: number) {
        this.position.y -= squareSize;
    }

    public moveDown(squareSize: number) {
        this.position.y += squareSize;
    }
}