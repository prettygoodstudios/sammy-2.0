import Landscape from "./landscape";
import LeftGrass from "../assets/LeftGrass.svg";
import RightGrass from "../assets/RightGrass.svg";
import MiddleGrass from "../assets/MiddleGrass.svg";

const leftGrass = new Image();
const rightGrass = new Image();
const middleGrass = new Image();

export const LEFT_GROUND_POSITION = 'left';
export const RIGHT_GROUND_POSITION = 'right';
export const MIDDLE_GROUND_POSITION = 'middle';

export const instantiateGrassImages = () => {
    leftGrass.src = LeftGrass;
    rightGrass.src = RightGrass;
    middleGrass.src = MiddleGrass; 
}

export default class Ground extends Landscape {
    constructor(x, y, position = MIDDLE_GROUND_POSITION){
        super(x, y, 50, 50);
        this.leftGrass = leftGrass;
        this.rightGrass = rightGrass;
        this.middleGrass = middleGrass;
        this.position = position;
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        const remainder = canvas.height-cameraOffset[1] - this.y;
        const windowHeight = Math.ceil(remainder/this.height);
        for(let i = 0; i < windowHeight; i++){
            if(i == 0){
                let image = undefined;
                switch(this.position){
                    case LEFT_GROUND_POSITION:
                        image = this.leftGrass;
                        break;
                    case RIGHT_GROUND_POSITION:
                        image = this.rightGrass;
                        break;
                    case MIDDLE_GROUND_POSITION:
                        image = this.middleGrass;
                }
                context.drawImage(image, this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+i*this.height+Math.floor(canvas.height/2)-player.height, this.width, this.width);
            }else{
                context.fillStyle = "#D7CCC8";
                context.fillRect(this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+i*this.height+Math.floor(canvas.height/2)-player.height, this.width, this.width);
            } 
        }
    }
}