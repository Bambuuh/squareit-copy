class Square {

    protected color;
    protected position = {x: 0, y: 0 };
    protected squareSize: number; 

    constructor(x: number, y: number, squareSize: number, color: string) { 
        this.position.x = x;
        this.position.y = y;
        this.color = color;
        this.squareSize = squareSize;
    }

    public getPosition() {
        return this.position;
    }

    public getColor() {
        return this.color;
    }

    public setColor(color: string) {
        this.color = color;
    }
}