import Building from "./building";

export default class Window extends Building {
    constructor(x, y){
        super();
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.color = "white";
        this.grassColor = "green";
        this.darkDirt = "brown";
        this.lightDirt = "beige";
        this.slivers = 4;
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        const remainder = canvas.height-cameraOffset[1] - this.y;
        const windowHeight = Math.ceil(remainder/this.height);
        const sliverHeight = Math.ceil(this.height/this.slivers);
        const dots = Math.floor(this.width/sliverHeight)*2;
        for(let i = 0; i < windowHeight; i++){
            for(let j = 0; j < this.slivers; j++){
                if(i !== 0 || j !== 0){
                    context.fillStyle = j % 2 === 0 ? this.darkDirt : this.lightDirt;
                    context.fillRect(this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+i*this.height+sliverHeight*j+Math.floor(canvas.height/2)-player.height, this.width, sliverHeight);
                }
            }
        }
        context.fillStyle = this.grassColor;
        context.fillRect(this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+Math.floor(canvas.height/2)-player.height, this.width, sliverHeight);
        context.beginPath();
        context.arc(this.x-cameraOffset[0]+offset-this.sliverHeight/2, cameraOffset[1]+this.y+Math.floor(canvas.height/2)-player.height+this.sliverHeight/2, this.sliverHeight*8, 0, Math.PI*2);
        context.closePath();
        context.fill();
    }
}