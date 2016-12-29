class Player extends Square {

    private map: Tile[];

    private rgb = {
        r: 209,
        g: 150,
        b:0,
    };

    constructor(x: number, y: number, squareSize: number, map: Tile[],  color: string) {
        super(x, y, squareSize, color);
        this.map = map;
    }

    public getPosition() {
        return this.position;
    }

    public moveTo(direction: string) {
        let newPosition: { x: number, y: number };
    
        if(direction === 'up'){
            newPosition = { x: this.getPosition().x, y: this.getPosition().y - this.squareSize };
        } else if(direction === 'right'){
            newPosition = { x: this.getPosition().x + this.squareSize, y: this.getPosition().y };
        } else if(direction === 'down') {
            newPosition = { x: this.getPosition().x, y: this.getPosition(). y+ this.squareSize };
        } else if(direction === 'left') {
            newPosition = { x: this.getPosition().x - this.squareSize, y: this.getPosition().y };
        }

        return this.move(newPosition);
    }

    private move(newPosition) {
        const nextTile = this.getCollidingTile(newPosition);

        if (nextTile.canVisit()) {
            this.position.y = newPosition.y;
            this.position.x = newPosition.x;
            nextTile.visit(this.getColor());
            if(nextTile.isTeleporter()) {
                const teleportTile = this.getTeleportTile(nextTile);
                const teleportPosition = {
                    x: teleportTile.getPosition().x,
                    y: teleportTile.getPosition().y,
                }
                return {
                    tile: teleportTile,
                    position: teleportPosition,
                }
                // teleportTile.visit(this.getColor());
            } 
        }
    }

    public teleportTo(position: {x: number, y: number}, tile: Tile) {
        this.position.x = position.x;
        this.position.y = position.y;
        tile.visit(this.getColor());
    }

    private getCollidingTile(position: {x: number, y: number}) {
        return this.map.filter(tile => this.isCollidingTile(position, tile))[0];
    }

    private isCollidingTile(position: {x: number, y: number}, tile: Tile) {
        return tile.getPosition().x === position.x && tile.getPosition().y === position.y;
    }

    private getTeleportTile(nextTile: Tile) {
        return this.map.filter(tile => tile.isTeleporter() && (tile.getPosition().x !== nextTile.getPosition().x || tile.getPosition().y !== nextTile.getPosition().y))[0];
    }

    private generateShade() {
        const max = 200;
        const min = 150;

        this.rgb.g = Math.floor(Math.random() * (max - min + 1)) + min;

        this.color = `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b})`;
    }
}