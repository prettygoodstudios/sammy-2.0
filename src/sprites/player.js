import Sprite from "./sprite";


export const PLAYER_HEIGHT = 100;

export default class Player extends Sprite{
    constructor(x, y, color, grounds, endGame){
        super(x, y, 50, PLAYER_HEIGHT, 40, 10, 50);
        this.color = color;
        this.endGame = endGame;
        this.keys = [];
        this.keyPressListener = window.addEventListener("keydown", (e) =>  this.handleKeyPress(e));
        this.keyUpListener = window.addEventListener("keyup", (e) =>  this.handleKeyUp(e));
    }



    handleKeyPress = (e) => {
        switch(e.key.toLowerCase()){
            case "arrowup":
            case "w":
                if(this.keys.indexOf("up") === -1){
                    this.keys.push("up");
                }
                break;
            case "arrowdown":
            case "s":
                if(this.keys.indexOf("down") === -1){
                    this.keys.push("down");
                }
                break;
            case "arrowright":
            case "d":
                if(this.keys.indexOf("right") === -1){
                    this.keys.push("right");
                }
                break;
            case "arrowleft":
            case "a":
                if(this.keys.indexOf("left") === -1){
                    this.keys.push("left");
                }
                break;
        }
    }

    handleKeyUp = (e) => {
        switch(e.key.toLowerCase()){
            case "arrowup":
            case "w":
                break;
            case "arrowdown":
            case "s":
                this.keys.splice(this.keys.indexOf("down"), 1);
                break;
            case "arrowright":
            case "d":
                this.keys.splice(this.keys.indexOf("right"), 1);
                break;
            case "arrowleft":
            case "a":
                this.keys.splice(this.keys.indexOf("left"), 1);
                break;
        }
    }

    updateSprite = (deltaTime, grounds, updateCameraOffset, offset) => {
        const onGround = this.onGround(grounds);
        this.keys.forEach(k => {
            if(onGround){
                switch(k){
                    case "up":
                        this.keys.splice(this.keys.indexOf("up"), 1);
                        this.velocityY -= this.acceleration*2;
                        break;
                    case "down":
                        this.velocityY += this.acceleration;
                        break;
                }
            }
            switch(k){
                case "right":
                    this.velocityX += this.acceleration;
                    break;
                case "left":
                    this.velocityX -= this.acceleration;
                    break;
            }
        });
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

    collectCoins = (coins, incrementScore) => {
        const collection = [];
        coins.forEach((c, i) => {
            if(this.collides(c)){
                collection.push(i);
            }
        });
        collection.forEach(c => {
            coins.splice(c, 1);
        });
        incrementScore(collection.length);
    }

    die = () => {
        this.removeEventListeners();
        this.endGame();
    }

    removeEventListeners = () => {
        window.removeEventListener("keydown", this.handleKeyPress);
        window.removeEventListener("keyup", this.handleKeyUp);
    }
}