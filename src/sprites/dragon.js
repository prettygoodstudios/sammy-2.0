import Sprite from "./sprite";

export default class Dragon extends Sprite {
    constructor(x, y){
        super(x, y, 200, 50, 2, 1, 40);
        this.direction = Math.random() > 0.5 ? 1 : -1;
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        if(this.inFrame(cameraOffset, canvas)){
            context.fillStyle = "green";
            context.fillRect(this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.width, this.height);
        }
    }

    updateSprite = (deltaTime, grounds) =>{
        this.update(deltaTime, grounds);
        this.velocityX = this.acceleration*this.direction;
    }

    switchDirection = () => {
        if(Math.random() > 0.7){
            this.direction = -this.direction;
            this.acceleration = this.direction*this.acceleration;
        }
    }
}