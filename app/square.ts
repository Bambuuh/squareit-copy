class Square {

    private color = 'black';
    protected position = {x: 0, y: 0 };

    constructor(x: number, y: number ) { 
        this.position.x = x;
        this.position.y = y;
    }

    public getPosition() {
        return this.position;
    }

    public getColor() {
        return this.color;
    }
}