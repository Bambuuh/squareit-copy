var Game = (function () {
    function Game() {
        var _this = this;
        this.lastTime = Date.now();
        this.mapGenerator = new MapGenerator();
        this.squareSize = 40;
        this.iconSize = this.squareSize / 4;
        this.lineWidth = 2;
        this.map = this.mapGenerator.generateMap(this.squareSize, this.mapSettings);
        this.playerOne = new Player(this.map.startPositions[0].x, this.map.startPositions[0].y, this.squareSize, this.map.tiles, 'red');
        this.playerTwo = new Player(this.map.startPositions[1].x, this.map.startPositions[1].y, this.squareSize, this.map.tiles, 'blue');
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
            var teleportOne = undefined;
            var teleportTwo = undefined;
            switch (event.keyCode) {
                case 37:
                    teleportOne = _this.moveplayerSquareLeft(_this.playerOne);
                    teleportTwo = _this.moveplayerSquareLeft(_this.playerTwo);
                    break;
                case 38:
                    teleportOne = _this.moveplayerSquareUp(_this.playerOne);
                    teleportTwo = _this.moveplayerSquareUp(_this.playerTwo);
                    break;
                case 39:
                    teleportOne = _this.moveplayerSquareRight(_this.playerOne);
                    teleportTwo = _this.moveplayerSquareRight(_this.playerTwo);
                    break;
                case 40:
                    teleportOne = _this.moveplayerSquareDown(_this.playerOne);
                    teleportTwo = _this.moveplayerSquareDown(_this.playerTwo);
                    break;
            }
            if ((teleportOne && teleportTwo) || (!teleportOne && !teleportTwo)) {
                return;
            }
            else {
                if (teleportOne) {
                    _this.playerOne.teleportTo(teleportOne.position, teleportOne.tile);
                }
                if (teleportTwo) {
                    _this.playerTwo.teleportTo(teleportTwo.position, teleportTwo.tile);
                }
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
        this.map.tiles.forEach(function (tile) {
            _this.context.fillStyle = tile.getColor();
            _this.context.fillRect(tile.getPosition().x, tile.getPosition().y, _this.squareSize, _this.squareSize);
            if (tile.isTeleporter() && tile.canVisit()) {
                var centerPos = _this.getSquareCenterPosition(tile.getPosition());
                _this.context.lineWidth = _this.lineWidth;
                _this.context.beginPath();
                _this.context.arc(centerPos.x + (_this.iconSize / 2), centerPos.y + (_this.iconSize / 2), (_this.iconSize / 2), 0, 2 * Math.PI);
                _this.context.stroke();
            }
        });
    };
    Game.prototype.drawPLayer = function () {
        this.renderPlayer(this.playerOne, 'red');
        this.renderPlayer(this.playerTwo, 'blue');
    };
    Game.prototype.renderPlayer = function (player, color) {
        this.context.fillStyle = color; // #ffffe5
        this.context.fillRect(player.getPosition().x, player.getPosition().y, this.squareSize, this.squareSize);
        var centerPos = this.getSquareCenterPosition(player.getPosition());
        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.lineWidth;
        this.context.strokeRect(centerPos.x, centerPos.y, this.squareSize / 4, this.squareSize / 4);
    };
    Game.prototype.getSquareCenterPosition = function (squarePosition) {
        return {
            x: squarePosition.x + (this.squareSize / 2) - (this.iconSize / 2),
            y: squarePosition.y + (this.squareSize / 2) - (this.iconSize / 2),
        };
    };
    Game.prototype.resizeCanvas = function () {
        this.canvas.width = this.mapSize.width;
        this.canvas.height = this.mapSize.height;
        this.render();
    };
    Game.prototype.moveplayerSquareLeft = function (player) {
        if (player.getPosition().x - this.squareSize >= 0) {
            return player.moveTo('left');
        }
    };
    Game.prototype.moveplayerSquareRight = function (player) {
        if (player.getPosition().x < this.mapSize.width - this.squareSize) {
            return player.moveTo('right');
        }
    };
    Game.prototype.moveplayerSquareUp = function (player) {
        if (player.getPosition().y - this.squareSize >= 0) {
            return player.moveTo('up');
        }
    };
    Game.prototype.moveplayerSquareDown = function (player) {
        if (player.getPosition().y < this.mapSize.height - this.squareSize) {
            return player.moveTo('down');
        }
    };
    Game.prototype.visitTile = function (player) {
        var _this = this;
        var tile = this.map.tiles.filter(function (tile) {
            return _this.isSamePosition(tile, player);
        })[0];
        tile.visit(player.getColor());
    };
    Game.prototype.isSamePosition = function (a, b) {
        return a.getPosition().x === b.getPosition().x && a.getPosition().y === b.getPosition().y;
    };
    return Game;
}());
//# sourceMappingURL=game.js.map