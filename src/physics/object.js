import Player from "../sprites/player";
import Geometry from "./geometry";

export default class PhysicalObject extends Geometry {
    constructor(x, y, width, height, acceleration, drag, maxSpeed){
        super(x, y, width, height);
        this.drag = drag;
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
    }

    calculateGravityAndCollsions = (grounds) => {
        let onGround = false;
        grounds.forEach(g => {
            if(this.collides(g)){
                if(!this.sideCollision(g)){
                    onGround = true;
                    this.y = g.y-this.height;
                }
            }
            
            if(this.leftCollision(g, Math.abs(this.velocityX)*0.5)){
                if(this.velocityX > 0){
                    this.velocityX = 0;
                    //this.x = g.x-this.width;
                }
            }
            if(this.rightCollision(g, Math.abs(this.velocityX)*0.5)){
                if(this.velocityX < 0){
                    this.velocityX = 0;
                    //this.x = g.x+g.width;
                }
            }
        });

        if(onGround){
            this.velocityY = this.velocityY > 0 ? 0 : this.velocityY;
        }else{
            this.velocityY += this.gravity;
        }

        return onGround;
    }

    update = (deltaTime, grounds) => {
        const onGround = this.calculateGravityAndCollsions(grounds);
        this.x += Math.floor(this.velocityX*deltaTime) % this.maxSpeed;
        this.y += Math.floor(this.velocityY*deltaTime) % this.maxSpeed;
        const adjustedDrag = onGround ? this.drag*4 : this.drag;
        if(this.velocityX != 0){
            const velocityMagnitude = Math.abs(this.velocityX)-adjustedDrag;
            this.velocityX =  velocityMagnitude > 0 ? velocityMagnitude*(this.velocityX/Math.abs(this.velocityX)) : 0;
        }
        if(this.velocityY != 0){
            const velocityMagnitude = Math.abs(this.velocityY)-this.drag;
            this.velocityY =  velocityMagnitude > 0 ? velocityMagnitude*(this.velocityY/Math.abs(this.velocityY)) : 0;
        }
        
    }

    //Purely for debugging
    renderVelocity = (context) => {
        context.strokeStyle = "yellow";
        const left = 100;
        const top = 100;
        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left+Math.floor(this.velocityX*50), top+Math.floor(this.velocityY*50));
        context.closePath();
        context.stroke();
    }

    onGround = (grounds) => {
        let onGround = false;
        grounds.forEach(g => {
            if(this.collides(g)){
                onGround = true;
            }
        });
        return onGround;
    }
}