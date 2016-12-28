class Tile extends Square {

    private visited = false;
    private teleporter = false;
    private empty = false;

    constructor(x: number, y: number, squareSize: number, type: number, color: string) {
        super(x, y, squareSize, color);
        switch (type) {
            case 1:
                this.teleporter = true;
                break;
            case 2:
                this.empty = true;
            default:
                break;
        }
    }

    public visit(color: string) {
        this.setColor(color);
        this.visited = true;
    }

    public canVisit() {
        return !this.visited && !this.empty;
    }

    public isTeleporter() {
        return this.teleporter;
    }
}