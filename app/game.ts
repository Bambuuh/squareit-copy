class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    private lastTime = Date.now();
    private mapGenerator = new MapGenerator();
    private squareSize = 40;

    private map = this.mapGenerator.generateMap(this.squareSize, this.mapSettings);

    public playerOne = new Player(0, 0, this.squareSize, this.map, 'red');
    public playerTwo = new Player(this.squareSize * 2, 0, this.squareSize, this.map, 'blue');

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
        this.map.forEach(tile => {
            this.context.fillStyle = tile.getColor();
            this.context.fillRect(tile.getPosition().x, tile.getPosition().y, this.squareSize, this.squareSize);
        });
    }

    private drawPLayer() {
        this.renderPlayer(this.playerOne, 'red');
        this.renderPlayer(this.playerTwo, 'blue');
    }

    private renderPlayer(player: Player, color: string) {
        this.context.fillStyle = color // #ffffe5
        this.context.fillRect(player.getPosition().x, player.getPosition().y, this.squareSize, this.squareSize);
    }

    public resizeCanvas() {
        this.canvas.width = this.mapSize.width;
        this.canvas.height = this.mapSize.height;

        this.render();
    }

    public handleMovement = (event) => {
        switch (event.keyCode) {
            case 37: // Left
                this.moveplayerSquareLeft(this.playerOne);
                this.moveplayerSquareLeft(this.playerTwo);
                break;

            case 38: // Up
               this.moveplayerSquareUp(this.playerOne);
               this.moveplayerSquareUp(this.playerTwo);
                break;

            case 39: // Right
                this.moveplayerSquareRight(this.playerOne);
                this.moveplayerSquareRight(this.playerTwo);
                break;

            case 40: // Down
                this.moveplayerSquareDown(this.playerOne);
                this.moveplayerSquareDown(this.playerTwo);
                break;
        }
    }

    private moveplayerSquareLeft(player: Player) {
        if (player.getPosition().x - this.squareSize >= 0) {
            if(player.moveLeft()) {
                this.visitTile(player);
            }
        }
    }

    private moveplayerSquareRight(player: Player) {
        if (player.getPosition().x < this.mapSize.width - this.squareSize) {
            if(player.moveRight()) {
                this.visitTile(player);
            }
        }
    }

    private moveplayerSquareUp(player: Player) {
        if (player.getPosition().y - this.squareSize >= 0) {
            if(player.moveUp()) {
                this.visitTile(player);
            }
        }
    }

    private moveplayerSquareDown(player: Player) {
        if (player.getPosition().y < this.mapSize.height - this.squareSize) {
            if(player.moveDown()) {
                this.visitTile(player);
            }
        }
    }

    private visitTile(player: Player) {
        const tile = this.map.filter(tile => {
            return tile.getPosition().x === player.getPosition().x && tile.getPosition().y === player.getPosition().y;
        })[0];
        tile.visit(player.getColor());
    }
}