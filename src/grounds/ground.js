import Landscape from "./landscape";
import LeftGrass from "../assets/LeftGrass.svg";
import RightGrass from "../assets/RightGrass.svg";
import MiddleGrass from "../assets/MiddleGrass.svg";

const leftGrass = new Image();
const rightGrass = new Image();
const middleGrass = new Image();


export const instantiateGrassImages = () => {
    leftGrass.src = LeftGrass;
    rightGrass.src = RightGrass;
    middleGrass.src = MiddleGrass; 
}

export default class Ground extends Landscape {
    constructor(x, y, blocks=1){
        super(x, y, 50*blocks, 50);
        this.blocks = blocks;
        this.leftGrass = leftGrass;
        this.rightGrass = rightGrass;
        this.middleGrass = middleGrass;
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        const remainder = canvas.height-cameraOffset[1] - this.y;
        for(let b = 0; b < this.blocks; b++){
            let image = undefined;
            switch(b){
                case 0:
                    image = this.leftGrass;
                    break;
                case this.blocks-1:
                    image = this.rightGrass;
                    break;
                default:
                    image = this.middleGrass;
            }
            context.drawImage(image, this.x-cameraOffset[0]+offset+b*this.height, cameraOffset[1]+this.y+Math.floor(canvas.height/2)-player.height, this.height, this.height); 
        }
        context.fillStyle = "#D7CCC8";
        context.fillRect(this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+Math.floor(canvas.height/2)-player.height+this.height, this.width, remainder)
    }
}