import jetpack1 from "../assets/JetPack1.svg";
import jetpack2 from "../assets/JetPack2.svg";
import jetpack3 from "../assets/JetPack3.svg";
import jetpack4 from "../assets/JetPack4.svg";
import jetpackstatic from "../assets/jetpackstatic.svg";
import { animate } from "../helpers/animation";
import Geometry from "../physics/geometry";

const frames = [];

export const loadJetPackFrames = () => {
    if(frames.length == 0){
        const images = [jetpack1, jetpack2, jetpack3, jetpack4];
        images.forEach(i => {
            const frame = new Image();
            frame.src = i;
            frames.push(frame);
        });
    }
}

export const JETPACK_WIDTH = 35;
export const JETPACK_HEIGHT = 70;

export default class JetPack extends Geometry {
    constructor(x,y){
        super(x,y, JETPACK_WIDTH, JETPACK_HEIGHT);
        this.frames = frames;
        this.frameIndex = 0;
        this.staticImage = new Image();
        this.staticImage.src = jetpackstatic;
        this.image = this.frames[this.frameIndex];
    }

    render = (context, canvas, flying) => {
         if(flying){
            this.frameIndex = animate(this, this.frames, this.frameIndex, 0.2);
         }else{
             this.image = this.staticImage;
         }
         context.drawImage(this.image, this.x, canvas.height/2-this.height-this.y, this.width, this.height);
    }

    flipDirection = (direction) => {
        switch(direction){
            case -1:
                this.x = JETPACK_WIDTH*0.15+85;
                break;
            case 1:
                this.x = 50-JETPACK_WIDTH*0.15;
        }
    }
}
