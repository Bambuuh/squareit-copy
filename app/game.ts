class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    private lastTime = Date.now();
    private mapGenerator = new MapGenerator();
    private squareSize = 40;

    public playerSquareOne = new PlayerSquare(0, 0);
    public playerSquareTwo = new PlayerSquare(this.squareSize * 2, 0);

    private mapSettings = {
        empty: [
            {x:1 * this.squareSize, y:0},
            {x: 2 * this.squareSize, y: 2 * this.squareSize},
        ]
    }

    private map = this.mapGenerator.generateMap(this.squareSize, this.mapSettings);

    private mapSize = {
        width: this.squareSize * 5,
        height: this.squareSize * 7,
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
        this.drawPLayerSquares();
    }

    private drawMap() {
        this.map.forEach(column => {
            column.forEach(square => {
                // if (this.mapSettings.empty.every(empty => empty.x !== square.getPosition().x || empty.y !== square.getPosition().y)) {
                    this.context.fillStyle = square.getColor();
                    this.context.fillRect(square.getPosition().x, square.getPosition().y, this.squareSize, this.squareSize);
                // }
            });
        });
    }

    private drawPLayerSquares() {
        this.renderPlayer(this.playerSquareOne, 'red');
        this.renderPlayer(this.playerSquareTwo, 'blue');
    }

    private renderPlayer(playerSquare: PlayerSquare, color: string) {
        this.context.fillStyle = color // #ffffe5
        this.context.fillRect(playerSquare.getPosition().x, playerSquare.getPosition().y, this.squareSize, this.squareSize);
    }

    public resizeCanvas() {
        this.canvas.width = this.mapSize.width;
        this.canvas.height = this.mapSize.height;

        this.render();
    }

    public movePLayer = (event) => {
        switch (event.keyCode) {
            case 37: // Left
                game.playerSquareOne.moveLeft(this.squareSize);
                game.playerSquareTwo.moveLeft(this.squareSize);
                break;

            case 38: // Up
                game.playerSquareOne.moveUp(this.squareSize);
                game.playerSquareTwo.moveUp(this.squareSize);
                break;

            case 39: // Right
                game.playerSquareOne.moveRight(this.squareSize, this.mapSize);
                game.playerSquareTwo.moveRight(this.squareSize, this.mapSize);
                break;

            case 40: // Down
                game.playerSquareOne.moveDown(this.squareSize, this.mapSize);
                game.playerSquareTwo.moveDown(this.squareSize, this.mapSize);
                break;
        }
    }
}