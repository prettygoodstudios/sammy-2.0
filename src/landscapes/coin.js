import Geometry from "../physics/geometry";

import coinZero from "../assets/Coin0.svg";
import coinOne from "../assets/Coin1.svg";
import coinTwo from "../assets/Coin2.svg";
import coinThree from "../assets/Coin3.svg";
import {animate} from "../helpers/animation";

let coinSprites = [];

export const loadCoinSprites = () => {
    let c0 = new Image();
    c0.src = coinZero;
    let c1 = new Image();
    c1.src = coinOne;
    let c2 = new Image();
    c2.src = coinTwo
    let c3 = new Image();
    c3.src = coinThree;

    coinSprites = [
        c0,
        c1,
        c2,
        c3,
        c2,
        c1
    ]
}

export default class Coin extends Geometry {
    constructor(x, y, radius = 50){
        super(x, y, radius*2, radius*2);
        this.radius = radius;
        this.color = "gold";
        this.sprites = coinSprites;
        this.image = this.sprites[0];
        this.coinPosition = 0;
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        
        if(this.inFrame(cameraOffset, canvas)){
            //context.fillStyle = this.color;
            //context.beginPath();
            //context.arc(this.x-cameraOffset[0]+offset+this.radius, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height+this.radius, this.radius, 0, Math.PI*2);
            //context.closePath();
            //context.fill();
            this.coinPosition = this.animate(this.sprites, this.coinPosition);
            context.drawImage(this.image, this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.radius*2, this.radius*2);
        }
    }

    animate = (sprites, position, rate=0.2) => {
        return animate(this, sprites, position, rate);
    }
}