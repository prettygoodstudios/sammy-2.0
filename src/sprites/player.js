import PhysicalObject from "../physics/object";
import { endGame } from "..";


export const PLAYER_HEIGHT = 50;

export default class Player extends PhysicalObject{
    constructor(x, y, color, grounds, endGame){
        super(x, y, PLAYER_HEIGHT, 100, 20, 2, 50);
        this.color = color;
        this.endGame = endGame
        this.keyPressListener = window.addEventListener("keydown", (e) =>  this.handleKeyPress(e, grounds));
    }

    handleKeyPress = (e, grounds) => {
        const onGround = this.onGround(grounds);
        if(onGround){
            switch(e.key.toLowerCase()){
                case "arrowup":
                case "w":
                    this.velocityY -= this.acceleration;
                    break;
                case "arrowdown":
                case "s":
                    this.velocityY += this.acceleration;
                    break;
            }
        }
        switch(e.key.toLowerCase()){
            case "arrowright":
            case "d":
                this.velocityX += this.acceleration;
                break;
            case "arrowleft":
            case "a":
                this.velocityX -= this.acceleration;
                break;
        }
    }

    updatePlayer = (deltaTime, updateCameraOffset, grounds, offset) => {
        this.update(deltaTime, grounds);
        if(this.x < offset){
            this.x = offset;
        }
        updateCameraOffset(this.x, -this.y);
    }

    render = (canvas, context, cameraOffset) => {
        context.fillStyle = this.color;
        context.fillRect(50, canvas.height/2-this.height, this.width, this.height);
    }

    killRobots = (robots) => {
        const killIndexes = [];
        robots.forEach((r, i) => {
            if(this.collides(r)){
                if(this.topCollision(r)){
                    killIndexes.push(i);
                }else{
                    this.die();
                }
            }
        });
        killIndexes.forEach(k => {
            robots.splice(k, 1);
        });
    }

    die = () => {
        this.removeEventListeners();
        this.endGame();
    }

    removeEventListeners = () => {
        window.removeEventListener("click", this.keyPressListener);
    }
}