var Game = (function () {
    function Game() {
        var _this = this;
        this.lastTime = Date.now();
        this.mapGenerator = new MapGenerator();
        this.playerSquareOne = new PlayerSquare(0, 0);
        this.playerSquareTwo = new PlayerSquare(this.squareSize * 2, 0);
        this.squareSize = this.playerSquareOne.getSize();
        this.mapSettings = {
            empty: [
                { x: 1 * this.squareSize, y: 0 },
                { x: 2 * this.squareSize, y: 2 * this.squareSize },
            ]
        };
        this.map = this.mapGenerator.generateMap(this.squareSize, this.mapSettings);
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
    }
    Game.prototype.setupCanvas = function (canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    };
    Game.prototype.render = function () {
        this.context.clearRect(0, 0, this.mapSize.width, this.mapSize.height);
        this.drawMap();
        this.drawPLayerSquares();
    };
    Game.prototype.drawMap = function () {
        var _this = this;
        this.map.forEach(function (column) {
            column.forEach(function (square) {
                if (_this.mapSettings.empty.every(function (empty) { return empty.x !== square.getPosition().x || empty.y !== square.getPosition().y; })) {
                    _this.context.fillStyle = square.getColor();
                    _this.context.fillRect(square.getPosition().x, square.getPosition().y, _this.squareSize, _this.squareSize);
                }
            });
        });
    };
    Game.prototype.drawPLayerSquares = function () {
        this.renderPlayer(this.playerSquareOne);
        this.renderPlayer(this.playerSquareTwo);
    };
    Game.prototype.renderPlayer = function (playerSquare) {
        var _this = this;
        var positions = playerSquare.getPositions();
        var lastIndex = positions.length - 1;
        positions.forEach(function (position, index) {
            _this.context.fillStyle = index === lastIndex ? 'blue' : 'red'; // #ffffe5
            _this.context.fillRect(position.x, position.y, _this.squareSize, _this.squareSize);
        });
    };
    Game.prototype.resizeCanvas = function () {
        this.canvas.width = this.mapSize.width;
        this.canvas.height = this.mapSize.height;
        this.render();
    };
    Game.prototype.movePLayer = function (event) {
        switch (event.keyCode) {
            case 37:
                game.playerSquareOne.moveLeft();
                game.playerSquareTwo.moveLeft();
                break;
            case 38:
                game.playerSquareOne.moveUp();
                game.playerSquareTwo.moveUp();
                break;
            case 39:
                game.playerSquareOne.moveRight();
                game.playerSquareTwo.moveRight();
                break;
            case 40:
                game.playerSquareOne.moveDown();
                game.playerSquareTwo.moveDown();
                break;
        }
    };
    return Game;
}());
//# sourceMappingURL=game.js.map