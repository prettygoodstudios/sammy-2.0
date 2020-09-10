import Geometry from "../physics/geometry";

export default class Coin extends Geometry {
    constructor(x, y, radius = 50){
        super(x, y, radius*2, radius*2);
        this.radius = radius;
        this.color = "gold";
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        if(this.inFrame(cameraOffset, canvas)){
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x-cameraOffset[0]+offset+this.radius, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height+this.radius, this.radius, 0, Math.PI*2);
            context.closePath();
            context.fill();
        }
    }
}