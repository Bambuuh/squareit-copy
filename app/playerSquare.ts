class PlayerSquare extends Square {

    constructor(x: number, y: number) {
        super(x, y)
    }

    public getPosition() {
        return this.position;
    }

    public moveLeft(squareSize: number) {
        if (this.position.x - squareSize >= 0) {
            this.position.x -= squareSize;
        }
    }
    public moveRight(squareSize: number, mapSize: { width:number, height: number}) {
        if (this.position.x < mapSize.width - squareSize) {
            this.position.x += squareSize;
        }
    }

    public moveUp(squareSize: number) {
        if (this.position.y - squareSize >= 0) {
            this.position.y -= squareSize;
        }
    }

    public moveDown(squareSize: number, mapSize: { width:number, height: number}) {
        if (this.position.y < mapSize.height - squareSize) {
            this.position.y += squareSize;
        }
    }
}