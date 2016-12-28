const mapGenerator = new MapGenerator();
const game = new Game();

window.addEventListener('resize', game.resizeCanvas, false);
window.addEventListener('keydown', game.handleMovement, false);

window.onload = () => {
    game.setupCanvas(<HTMLCanvasElement>document.getElementById('cnvs'));
    game.resizeCanvas();
    game.startGame();
}