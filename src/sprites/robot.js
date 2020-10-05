import Sprite from "./sprite";
import RobotFrame1 from "../assets/RobotFrame1.svg";
import RobotFrame2 from "../assets/RobotFrame2.svg";
import RobotFrame3 from "../assets/RobotFrame3.svg";
import RobotFrame4 from "../assets/RobotFrame4.svg";
import RobotFrame5 from "../assets/RobotFrame5.svg";

export const ROBOT_HEIGHT = 50;

export default class Robot extends Sprite {
    constructor(x, y, direction){
        super(x, y, 50, ROBOT_HEIGHT, 3, 0.1, 10);
        this.color = "black";
        this.direction = direction;
        this.velocity = 2;
        this.acceleration = this.direction*this.velocity;  
        this.spriteImages = [
            RobotFrame1,
            RobotFrame2,
            RobotFrame3,
            RobotFrame4,
            RobotFrame5
        ]
        this.forwardSprites = [];
        this.forwardSpritesPosition = 0;
        this.spriteImages.forEach(s => {
            const img = new Image();
            img.src = s;
            this.forwardSprites.push(img);
        });
        this.image = this.spriteImages[0];
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        this.forwardSpritesPosition = this.animate(this.forwardSprites, this.forwardSpritesPosition);
        if(this.inFrame(cameraOffset, canvas)){
            //context.fillStyle = this.color;
            //context.fillRect(this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.width, this.height);
            context.drawImage(this.image, this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.width, this.height);
        }
    }

    updateSprite = (deltaTime, grounds) => {
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