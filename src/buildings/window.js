import Building from "./building";

export default class Window extends Building {
    constructor(x, y){
        super();
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.color = "white";
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        context.fillStyle = this.color;
        const remainder = canvas.height-cameraOffset[1] - this.y;
        const windowHeight = Math.ceil(remainder/this.height);
        for(let i = 0; i < windowHeight; i++){
            context.fillRect(this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+i*this.height+Math.floor(canvas.height/2)-player.height, this.width, this.height);
        }
    }
}