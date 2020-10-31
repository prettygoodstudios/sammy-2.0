import Geometry from "../physics/geometry";
import Sprite from "./sprite";

import ufoImg1 from "../assets/ufo0.svg";
import ufoImg2 from "../assets/ufo1.svg";
import ufoImg3 from "../assets/ufo2.svg";

const ufoImages = [];
export const instantiateUfoImages = () => {
    const ufo1 = new Image();
    ufo1.src = ufoImg1;
    const ufo2 = new Image();
    ufo2.src = ufoImg2;
    const ufo3 = new Image();
    ufo3.src = ufoImg3;
    ufoImages.push(ufo1);
    ufoImages.push(ufo2);
    ufoImages.push(ufo3);
    ufoImages.push(ufo2);
}

class Pellet extends Geometry {
    constructor(x, y, theta){
        super(x, y, 10, 10);
        this.theta = theta;
        this.velocity = 0.2;
    }

    update = (deltaTime) => {
        this.y += deltaTime*this.velocity*Math.sin(this.theta);
        this.x += deltaTime*this.velocity*Math.cos(this.theta);
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        context.fillStyle = "orange";
        context.beginPath();
        context.arc(this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.width, 0, Math.PI*2);
        context.closePath();
        context.fill();
    }
}

export default class Ufo extends Sprite {
    constructor(x, y){
        super(x, y, 429*0.3, 330*0.3, 2, 1, 10);
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.minX = x - 5000;
        this.maxX = x + 5000;
        this.pellets = [];
        this.sprites = ufoImages;
        this.image = ufoImages[0];
        this.spritePos = 0;
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        if(this.inFrame(cameraOffset, canvas)){
            context.fillStyle = "green";
            this.spritePos = this.animate(this.sprites, this.spritePos, 0.2);
            context.drawImage(this.image, this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.width, this.height);
            this.shoot();
        }
        this.pellets.forEach(p => {
            p.render(context, canvas, cameraOffset, player, offset);
            if(player && p.collides(player)){
                player.die();
            }
        });
    }

    updateSprite = (deltaTime, grounds) =>{
        this.update(deltaTime, [], false);
        this.velocityY = 0;
        this.switchDirection();
        const relevantGrounds = grounds.filter(g => g.x > this.x-1000 && g.x < this.x+1000)
        const deadPellets = [];
        this.pellets.forEach((p, i) => {
            p.update(deltaTime);
            relevantGrounds.forEach(g => {
                if(g.collides(p)){
                    deadPellets.push(i);
                } 
            })
        });

        deadPellets.forEach(p => this.pellets.splice(p, 1));
        
        this.velocityX = this.acceleration*this.direction;
    }

    switchDirection = () => {
        if(Math.random() > 0.95){
            this.direction = -this.direction;
        }
        if(this.x < this.minX){
            this.direction = 1;
        }
        if(this.x > this.maxX){
            this.direction = -1;
        }
    }

    shoot = () => {
        if(Math.random() > 0.98){
            const pellet = new Pellet(this.x+this.width/2, this.y+this.height, Math.random()*Math.PI*4/6+Math.PI/6);
            this.pellets.push(pellet);
        }
    }
}