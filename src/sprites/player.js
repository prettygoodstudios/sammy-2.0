import PhysicalObject from "../physics/object";

export default class Player extends PhysicalObject{
    constructor(x, y, color){
        super(x, y, 50, 100, 50, 2, 50);
        this.color = color;
        window.addEventListener("keydown", (e) =>  this.handleKeyPress(e));
    }

    handleKeyPress = (e) => {
        switch(e.key.toLowerCase()){
            case "arrowleft":
            case "d":
                this.velocityX += this.acceleration;
                break;
            case "arrowright":
            case "a":
                this.velocityX -= this.acceleration;
                break;
            case "arrowup":
            case "w":
                this.velocityY += this.acceleration;
                break;
            case "arrowdown":
            case "s":
                this.velocityY -= this.acceleration;
                break;
        }
    }

    updatePlayer = (deltaTime, updateCameraOffset, grounds) => {
        this.update(deltaTime, grounds);
        updateCameraOffset(this.x, this.y);
    }

    render = (canvas, context, cameraOffset) => {
        context.fillStyle = this.color;
        context.fillRect(50, canvas.height/2-this.height, this.width, this.height);
        
    }
}