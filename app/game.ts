class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    private lastTime = Date.now();
    private mapGenerator = new MapGenerator();
    private squareSize = 40;
    private iconSize = this.squareSize / 4;
    private lineWidth = 2;

    private map = this.mapGenerator.generateMap(this.squareSize, this.mapSettings);

    public playerOne = new Player(this.map.startPositions[0].x, this.map.startPositions[0].y, this.squareSize, this.map.tiles, 'red');
    public playerTwo = new Player(this.map.startPositions[1].x, this.map.startPositions[1].y, this.squareSize, this.map.tiles, 'blue');

    private mapSettings = {
        empty: [
            {x:1 * this.squareSize, y:0},
            {x: 2 * this.squareSize, y: 2 * this.squareSize},
        ]
    }


    private mapSize = {
        width: this.squareSize * 5,
        height: this.squareSize * 7,
    }

    public startGame() {
        this.visitTile(this.playerOne);
        this.visitTile(this.playerTwo);
        this.gameLoop()
    }

    public gameLoop = () => {
        const now = Date.now();
        const dt = (now - this.lastTime) / 1000.0;

        this.render();

        this.lastTime = now;
        requestAnimationFrame(this.gameLoop);
    }

    public setupCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    private render() {
        this.context.clearRect(0, 0, this.mapSize.width, this.mapSize.height);
        this.drawMap();
        this.drawPLayer();
    }

    private drawMap() {
        this.map.tiles.forEach(tile => {
            this.context.fillStyle = tile.getColor();
            this.context.fillRect(tile.getPosition().x, tile.getPosition().y, this.squareSize, this.squareSize);

            if(tile.isTeleporter() && tile.canVisit()) {
                const centerPos = this.getSquareCenterPosition(tile.getPosition());
                this.context.lineWidth = this.lineWidth;
                this.context.beginPath();
                this.context.arc(centerPos.x + (this.iconSize / 2), centerPos.y + (this.iconSize / 2), (this.iconSize / 2), 0, 2*Math.PI);
                this.context.stroke();
            }
        });
    }

    private drawPLayer() {
        this.renderPlayer(this.playerOne, 'red');
        this.renderPlayer(this.playerTwo, 'blue');
    }

    private renderPlayer(player: Player, color: string) {
        this.context.fillStyle = color // #ffffe5
        this.context.fillRect(player.getPosition().x, player.getPosition().y, this.squareSize, this.squareSize);

        const centerPos = this.getSquareCenterPosition(player.getPosition());

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.lineWidth;
        this.context.strokeRect(centerPos.x, centerPos.y, this.squareSize/4, this.squareSize/4);
    }

    private getSquareCenterPosition(squarePosition: { x: number, y: number }) {
        return {
            x: squarePosition.x + (this.squareSize / 2) - (this.iconSize / 2),
            y: squarePosition.y + (this.squareSize / 2) - (this.iconSize / 2),
        }
    }

    public resizeCanvas() {
        this.canvas.width = this.mapSize.width;
        this.canvas.height = this.mapSize.height;

        this.render();
    }

    public handleMovement = (event) => {
        let teleportOne = undefined;
        let teleportTwo = undefined;
        switch (event.keyCode) {
            case 37: // Left
                teleportOne = this.moveplayerSquareLeft(this.playerOne);
                teleportTwo = this.moveplayerSquareLeft(this.playerTwo);
                break;

            case 38: // Up
                teleportOne = this.moveplayerSquareUp(this.playerOne);
                teleportTwo = this.moveplayerSquareUp(this.playerTwo);
                break;

            case 39: // Right
                teleportOne = this.moveplayerSquareRight(this.playerOne);
                teleportTwo = this.moveplayerSquareRight(this.playerTwo);
                break;

            case 40: // Down
                teleportOne = this.moveplayerSquareDown(this.playerOne);
                teleportTwo = this.moveplayerSquareDown(this.playerTwo);
                break;
        }

        if ((teleportOne && teleportTwo) ||(!teleportOne && !teleportTwo)) {
            return;
        } else {
            if(teleportOne) {
                this.playerOne.teleportTo(teleportOne.position, teleportOne.tile);
            }
            if(teleportTwo) {
                this.playerTwo.teleportTo(teleportTwo.position, teleportTwo.tile);
            }
        }
    }

    private moveplayerSquareLeft(player: Player) {
        if (player.getPosition().x - this.squareSize >= 0) {
            return player.moveTo('left');
        }
    }

    private moveplayerSquareRight(player: Player) {
        if (player.getPosition().x < this.mapSize.width - this.squareSize) {
            return player.moveTo('right');
        }
    }

    private moveplayerSquareUp(player: Player) {
        if (player.getPosition().y - this.squareSize >= 0) {
            return player.moveTo('up');
        }
    }

    private moveplayerSquareDown(player: Player) {
        if (player.getPosition().y < this.mapSize.height - this.squareSize) {
            return player.moveTo('down');
        }
    }

    private visitTile(player: Player) {
        const tile = this.map.tiles.filter(tile => {
            return this.isSamePosition(tile, player);
        })[0];
        tile.visit(player.getColor());
    }

    private isSamePosition(a: Square, b: Square) {
        return a.getPosition().x === b.getPosition().x && a.getPosition().y === b.getPosition().y;
    }
}