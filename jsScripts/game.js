var Game = (function () {
    function Game() {
        var _this = this;
        this.lastTime = Date.now();
        this.mapGenerator = new MapGenerator();
        this.squareSize = 40;
        this.map = this.mapGenerator.generateMap(this.squareSize, this.mapSettings);
        this.playerOne = new Player(0, 0, this.squareSize, this.map, 'red');
        this.playerTwo = new Player(this.squareSize * 2, 0, this.squareSize, this.map, 'blue');
        this.mapSettings = {
            empty: [
                { x: 1 * this.squareSize, y: 0 },
                { x: 2 * this.squareSize, y: 2 * this.squareSize },
            ]
        };
        this.mapSize = {
            width: this.squareSize * 5,
            height: this.squareSize * 7,
        };
        this.gameLoop = function () {
            var now = Date.now();
            var dt = (now - _this.lastTime) / 1000.0;
            _this.render();
            _this.lastTime = now;
            requestAnimationFrame(_this.gameLoop);
        };
        this.handleMovement = function (event) {
            switch (event.keyCode) {
                case 37:
                    _this.moveplayerSquareLeft(_this.playerOne);
                    _this.moveplayerSquareLeft(_this.playerTwo);
                    break;
                case 38:
                    _this.moveplayerSquareUp(_this.playerOne);
                    _this.moveplayerSquareUp(_this.playerTwo);
                    break;
                case 39:
                    _this.moveplayerSquareRight(_this.playerOne);
                    _this.moveplayerSquareRight(_this.playerTwo);
                    break;
                case 40:
                    _this.moveplayerSquareDown(_this.playerOne);
                    _this.moveplayerSquareDown(_this.playerTwo);
                    break;
            }
        };
    }
    Game.prototype.startGame = function () {
        this.visitTile(this.playerOne);
        this.visitTile(this.playerTwo);
        this.gameLoop();
    };
    Game.prototype.setupCanvas = function (canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    };
    Game.prototype.render = function () {
        this.context.clearRect(0, 0, this.mapSize.width, this.mapSize.height);
        this.drawMap();
        this.drawPLayer();
    };
    Game.prototype.drawMap = function () {
        var _this = this;
        this.map.forEach(function (tile) {
            _this.context.fillStyle = tile.getColor();
            _this.context.fillRect(tile.getPosition().x, tile.getPosition().y, _this.squareSize, _this.squareSize);
        });
    };
    Game.prototype.drawPLayer = function () {
        this.renderPlayer(this.playerOne, 'red');
        this.renderPlayer(this.playerTwo, 'blue');
    };
    Game.prototype.renderPlayer = function (player, color) {
        this.context.fillStyle = color; // #ffffe5
        this.context.fillRect(player.getPosition().x, player.getPosition().y, this.squareSize, this.squareSize);
    };
    Game.prototype.resizeCanvas = function () {
        this.canvas.width = this.mapSize.width;
        this.canvas.height = this.mapSize.height;
        this.render();
    };
    Game.prototype.moveplayerSquareLeft = function (player) {
        if (player.getPosition().x - this.squareSize >= 0) {
            if (player.moveLeft()) {
                this.visitTile(player);
            }
        }
    };
    Game.prototype.moveplayerSquareRight = function (player) {
        if (player.getPosition().x < this.mapSize.width - this.squareSize) {
            if (player.moveRight()) {
                this.visitTile(player);
            }
        }
    };
    Game.prototype.moveplayerSquareUp = function (player) {
        if (player.getPosition().y - this.squareSize >= 0) {
            if (player.moveUp()) {
                this.visitTile(player);
            }
        }
    };
    Game.prototype.moveplayerSquareDown = function (player) {
        if (player.getPosition().y < this.mapSize.height - this.squareSize) {
            if (player.moveDown()) {
                this.visitTile(player);
            }
        }
    };
    Game.prototype.visitTile = function (player) {
        var tile = this.map.filter(function (tile) {
            return tile.getPosition().x === player.getPosition().x && tile.getPosition().y === player.getPosition().y;
        })[0];
        tile.visit(player.getColor());
    };
    return Game;
}());
//# sourceMappingURL=game.js.map