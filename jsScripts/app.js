var mapGenerator = new MapGenerator();
var game = new Game();
window.addEventListener('resize', game.resizeCanvas, false);
window.addEventListener('keydown', game.movePLayer, false);
window.onload = function () {
    game.setupCanvas(document.getElementById('cnvs'));
    game.resizeCanvas();
    game.gameLoop();
};
//# sourceMappingURL=app.js.map