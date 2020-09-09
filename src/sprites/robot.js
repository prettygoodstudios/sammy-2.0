import PhysicalObject from "../physics/object";

export const ROBOT_HEIGHT = 50;

export default class Robot extends PhysicalObject {
    constructor(x, y, direction){
        super(x, y, 50, ROBOT_HEIGHT, 3, 0.1, 10);
        this.color = "black";
        this.direction = direction;
        this.velocity = 2;
        this.acceleration = this.direction*this.velocity;  
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        context.fillStyle = this.color;
        context.fillRect(this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.width, this.height);
    }

    updateRobot = (deltaTime, grounds) => {
        this.velocityX += this.acceleration;
        this.switchDirection();
        this.jump(grounds);
        this.update(deltaTime, grounds);
    }

    switchDirection = () => {
        if(Math.random() > 0.9){
            this.direction = -this.direction;
            this.acceleration = this.direction*this.velocity;
        }
    }

    jump = (grounds) => {
        if(Math.random() > 0.9 && this.onGround(grounds)){
            this.velocityY = -5;
        }
    }

}