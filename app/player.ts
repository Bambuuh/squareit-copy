class Player extends Square {

    private map: Tile[];

    constructor(x: number, y: number, squareSize: number, map: Tile[],  color: string) {
        super(x, y, squareSize, color);
        this.map = map;
    }

    public getPosition() {
        return this.position;
    }

    public moveLeft() {
        const newPosition = {
            x: this.getPosition().x - this.squareSize,
            y: this.getPosition().y,
        }
        if (!this.isColliding(newPosition)) {
            this.position.x = newPosition.x;
            return true;
        }

        return false;
    }

    public moveRight() {
        const newPosition = {
            x: this.getPosition().x + this.squareSize,
            y: this.getPosition().y,
        }
        if (!this.isColliding(newPosition)) {
            this.position.x = newPosition.x;
            return true;
        }

        return false;
    }

    public moveUp() {
        const newPosition = {
            x: this.getPosition().x,
            y: this.getPosition().y - this.squareSize,
        }

        if (!this.isColliding(newPosition)) {
            this.position.y = newPosition.y;
            return true;
        }

        return false;
    }

    public moveDown() {
        const newPosition = {
            x: this.getPosition().x,
            y: this.getPosition().y + this.squareSize,
        }

        if (!this.isColliding(newPosition)) {
            this.position.y = newPosition.y
            return true;
        }

        return false;
    }

    private isColliding(position: {x: number, y: number}) {
        return this.map.some(tile => this.isCollidingTile(position, tile) && !tile.canVisit());
    }

    private isCollidingTile(position: {x: number, y: number}, tile: Tile) {
        return tile.getPosition().x === position.x && tile.getPosition().y === position.y;
    }
}