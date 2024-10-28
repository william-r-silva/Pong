export default class Ball {
    x: number;
    y: number;
    readonly radius: number;
    readonly color: string;
    
    constructor(x: number, y: number, radius: number = 10, color: string = '#000000'){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    setPosition(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}