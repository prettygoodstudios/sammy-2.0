export default class PhysicalObject {
    constructor(x, y, width, height, acceleration, drag, maxSpeed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.drag = drag;
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    update = (deltaTime) => {
        this.x += Math.floor(this.velocityX*deltaTime) % this.maxSpeed;
        this.y += Math.floor(this.velocityY*deltaTime) % this.maxSpeed;
        if(this.velocityX != 0){
            const velocityMagnitude = Math.abs(this.velocityX)-this.drag*deltaTime;
            this.velocityX =  velocityMagnitude > 0 ? velocityMagnitude*(this.velocityX/Math.abs(this.velocityX)) : 0;
            console.log(velocityMagnitude);
        }
        if(this.velocityY != 0){
            const velocityMagnitude = Math.abs(this.velocityY)-this.drag*deltaTime;
            this.velocityY =  velocityMagnitude > 0 ? velocityMagnitude*(this.velocityY/Math.abs(this.velocityY)) : 0;
            console.log(velocityMagnitude);
        }
    }
}