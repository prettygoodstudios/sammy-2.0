import Geometry from "./geometry";

export default class PhysicalObject extends Geometry {
    constructor(x, y, width, height, acceleration, drag, maxSpeed){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.drag = drag;
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
    }

    calculateGravity = (grounds) => {
        let onGround = false;
        grounds.forEach(g => {
            if(this.collides(g)){
                onGround = true;
                g.color = "green";
            }else{
                g.color = "white";
            }
        });
        if(!onGround){
            this.velocityY += this.gravity;
        }else{
            this.velocityY = this.velocityY > 0 ? 0 : this.velocityY;
        }
    }

    update = (deltaTime, grounds) => {
        this.x += Math.floor(this.velocityX*deltaTime) % this.maxSpeed;
        this.y += Math.floor(this.velocityY*deltaTime) % this.maxSpeed;
        if(this.velocityX != 0){
            const velocityMagnitude = Math.abs(this.velocityX)-this.drag;
            this.velocityX =  velocityMagnitude > 0 ? velocityMagnitude*(this.velocityX/Math.abs(this.velocityX)) : 0;
        }
        if(this.velocityY != 0){
            const velocityMagnitude = Math.abs(this.velocityY)-this.drag;
            this.velocityY =  velocityMagnitude > 0 ? velocityMagnitude*(this.velocityY/Math.abs(this.velocityY)) : 0;
        }
        this.calculateGravity(grounds);
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
}