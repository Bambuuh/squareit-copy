var mapGenerator = new MapGenerator();
var game = new Game();
window.addEventListener('resize', game.resizeCanvas, false);
window.addEventListener('keydown', game.handleMovement, false);
window.onload = function () {
    game.setupCanvas(document.getElementById('cnvs'));
    game.resizeCanvas();
    game.startGame();
};
//# sourceMappingURL=app.js.map