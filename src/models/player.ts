import Game from "./game";

export default class Player {
    private up_pressed: boolean = false;
    private down_pressed: boolean = false;
    
    points: number = 0;
    x: number = 0;
    y: number = 0;
    readonly id: string = '';
    readonly speed: number = 5;
    readonly width: number = 10;
    readonly height: number = 100;
    readonly color: string = '#000000';

    constructor(id: string, x: number, y: number, width: number = 10, height: number = 100, color: string = '#000000'){
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    setPosition(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    setKeysPressed({ up_pressed, down_pressed } : { up_pressed: boolean, down_pressed: boolean }){
        this.up_pressed = up_pressed;
        this.down_pressed = down_pressed;
    }

    updatePosition(){
        if(this.up_pressed){
            this.y -= this.speed;
        } else if(this.down_pressed){
            this.y += this.speed;
        }

        if(this.y < 0){
            this.y = 0;
        } else if(this.y > Game.get().screenHeight - this.height){
            this.y = Game.get().screenHeight - this.height;
        }
    }

    updatePoints(){
        this.points += 1;
    }
}