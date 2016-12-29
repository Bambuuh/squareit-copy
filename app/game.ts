class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    private lastTime = Date.now();
    private mapGenerator = new MapGenerator();
    private squareSize = 40;
    private iconSize = this.squareSize / 4;
    private lineWidth = 2;

    private maps = this.mapGenerator.getMaps(this.squareSize);
    private playerOneColor = 'rgb(128, 128, 128)';
    private playerTwoColor = 'rgb(0, 102, 102)';

    private mapIndex = 0;
    private mapPickerELement: Element;

    public playerOne = new Player(this.getCurrentMap().startPositions[0].x, this.getCurrentMap().startPositions[0].y, this.squareSize, this.getCurrentMap().tiles, this.playerOneColor);
    public playerTwo = new Player(this.getCurrentMap().startPositions[1].x, this.getCurrentMap().startPositions[1].y, this.squareSize, this.getCurrentMap().tiles, this.playerTwoColor);

    constructor() {
        this.mapPickerELement = document.getElementById('counter');
        this.mapPickerELement.innerHTML = `# ${this.mapIndex + 1}`;

        const undoButton = document.getElementsByClassName('fa-undo')[0];
        undoButton.addEventListener('click', (event) => this.resetMap());

        const previousButton = document.getElementsByClassName('fa-long-arrow-left')[0];
        previousButton.addEventListener('click', (event) => this.getPreviousMap());

        const nextButton = document.getElementsByClassName('fa-long-arrow-right')[0];
        nextButton.addEventListener('click', (event) => this.getNextMap());
    }

    private getCurrentMap() {
        return this.maps[this.mapIndex];
    }

    private getNextMap() {
        this.mapIndex = this.mapIndex + 1 < this.maps.length ? this.mapIndex + 1 : 0;
        this.resetMap();
        this.mapPickerELement.innerHTML = `# ${this.mapIndex + 1}`;
    }

    private getPreviousMap() {
        this.mapIndex = this.mapIndex - 1 >= 0 ? this.mapIndex - 1 : this.maps.length -1;
        this.resetMap();
        this.mapPickerELement.innerHTML = `# ${this.mapIndex + 1}`;
    }

    public resetMap() {
        this.resizeCanvas();
        this.maps[this.mapIndex] = this.mapGenerator.generateMapByIndex(this.squareSize, this.mapIndex);
        this.playerOne = new Player(this.getCurrentMap().startPositions[0].x, this.getCurrentMap().startPositions[0].y, this.squareSize, this.getCurrentMap().tiles, this.playerOneColor);
        this.playerTwo = new Player(this.getCurrentMap().startPositions[1].x, this.getCurrentMap().startPositions[1].y, this.squareSize, this.getCurrentMap().tiles, this.playerTwoColor);
        this.visitTile(this.playerOne);
        this.visitTile(this.playerTwo);
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
        this.context.clearRect(0, 0, this.getCurrentMap().dimensions.width, this.getCurrentMap().dimensions.height);
        this.drawMap();
        this.drawPLayer();
    }

    private drawMap() {
        this.getCurrentMap().tiles.forEach(tile => {
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
        this.renderPlayer(this.playerOne);
        this.renderPlayer(this.playerTwo);
    }

    private renderPlayer(player: Player) {
        this.context.fillStyle = player.getColor(); // #ffffe5
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
        this.canvas.width = this.getCurrentMap().dimensions.width;
        this.canvas.height = this.getCurrentMap().dimensions.height;

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
            
             case 82: // R
                this.resetMap();
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
        if (player.getPosition().x < this.getCurrentMap().dimensions.width - this.squareSize) {
            return player.moveTo('right');
        }
    }

    private moveplayerSquareUp(player: Player) {
        if (player.getPosition().y - this.squareSize >= 0) {
            return player.moveTo('up');
        }
    }

    private moveplayerSquareDown(player: Player) {
        if (player.getPosition().y < this.getCurrentMap().dimensions.height - this.squareSize) {
            return player.moveTo('down');
        }
    }

    private visitTile(player: Player) {
        const tile = this.getCurrentMap().tiles.filter(tile => {
            return this.isSamePosition(tile, player);
        })[0];
        tile.visit(player.getColor());
    }

    private isSamePosition(a: Square, b: Square) {
        return a.getPosition().x === b.getPosition().x && a.getPosition().y === b.getPosition().y;
    }
}