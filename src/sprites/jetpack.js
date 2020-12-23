import jp1 from "../assets/JP1.svg";
import jp2 from "../assets/JP2.svg";
import jp3 from "../assets/JP3.svg";
import jp4 from "../assets/JP4.svg";
import jetpackstatic from "../assets/jetpackstatic.svg";
import { animate } from "../helpers/animation";
import Geometry from "../physics/geometry";

const frames = [];

export const loadJetPackFrames = () => {
    if(frames.length == 0){
        const images = [jp1, jp2, jp3, jp4];
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
