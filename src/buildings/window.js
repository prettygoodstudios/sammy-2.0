import Building from "./building";
import LeftGrass from "../assets/LeftGrass.svg";
import RightGrass from "../assets/RightGrass.svg";
import MiddleGrass from "../assets/MiddleGrass.svg";
import Dirt from "../assets/Dirt.svg";

export default class Window extends Building {
    constructor(x, y, position = "middle"){
        super(x, y, 50, 50);
        this.leftGrass = new Image();
        this.leftGrass.src = LeftGrass;
        this.rightGrass = new Image();
        this.rightGrass.src = RightGrass;
        this.middleGrass = new Image();
        this.middleGrass.src = MiddleGrass;
        this.position = position;
        this.dirt = new Image();
        this.dirt.src = Dirt;
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        const remainder = canvas.height-cameraOffset[1] - this.y;
        const windowHeight = Math.ceil(remainder/this.height);
        for(let i = 0; i < windowHeight; i++){
            if(i == 0){
                let image = undefined;
                switch(this.position){
                    case "left":
                        image = this.leftGrass;
                        break;
                    case "right":
                        image = this.rightGrass;
                        break;
                    case "middle":
                        image = this.middleGrass;
                }
                context.drawImage(image, this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+i*this.height+Math.floor(canvas.height/2)-player.height, this.width, this.width);
            }else{
                context.fillStyle = "#D7CCC8";
                context.fillRect(this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+i*this.height+Math.floor(canvas.height/2)-player.height, this.width, this.width);
                //context.drawImage(this.dirt, this.x-cameraOffset[0]+offset, cameraOffset[1]+this.y+i*this.height+Math.floor(canvas.height/2)-player.height, this.width, this.width);
            } 
        }
    }
}