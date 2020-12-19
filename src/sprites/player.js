import Sprite from "./sprite";

import player0 from "../assets/Sammy1.svg";
import player1 from "../assets/Sammy2.svg";
import player2 from "../assets/Sammy3.svg";
import player3 from "../assets/Sammy4.svg";
import JetPack, { JETPACK_WIDTH, loadJetPackFrames } from "./jetpack";
import { getProducts } from "../helpers/db";
import { drawImageFlipped } from "../helpers/drawing";


export const PLAYER_HEIGHT = 100;

class TouchController {
    constructor(touchListner, liftListener){
        this.touchListener = touchListner;
        this.liftListener = liftListener;
        this.addElements();
    }

    addElements = () => {
        const leftButtons = document.createElement("div");
        leftButtons.className = "controller__left-btns";
        const upButton = this.createButton("upButton", "^", () => this.touchListener("w"), () => this.liftListener("w"));
        const downButton = this.createButton("downButton", "v", () => this.touchListener("s"), () => this.liftListener("s"));
        leftButtons.appendChild(upButton);
        leftButtons.appendChild(downButton);
        const rightButtons = document.createElement("div");
        rightButtons.className = "controller__right-btns";
        const leftButton =  this.createButton("leftButton", "<", () => this.touchListener("a"), () => this.liftListener("a"));
        const rightButton = this.createButton("rightButton", ">", () => this.touchListener("d"), () => this.liftListener("d"));
        rightButtons.appendChild(leftButton);
        rightButtons.appendChild(rightButton);
        const controllerEl = document.createElement("div");
        controllerEl.className = "controller";
        controllerEl.appendChild(leftButtons);
        controllerEl.appendChild(rightButtons);
        document.body.appendChild(controllerEl);
    }

    createButton = (id, text, touchListener, liftListener) => {
        const button = document.createElement("button");
        button.addEventListener("touchstart", touchListener);
        button.addEventListener("touchend", liftListener);
        button.innerHTML = text;
        button.id = id;
        button.className = "controller__btn";
        return button;
    }

    removeElements = () => {
        document.querySelector(".controller").remove();
    }

    static isTouchEnabled() { 
        return ( 'ontouchstart' in window ) ||  
            ( navigator.maxTouchPoints > 0 ) ||  
            ( navigator.msMaxTouchPoints > 0 ); 
    } 

}

export default class Player extends Sprite{
    constructor(x, y, color, endGame){
        super(x, y, PLAYER_HEIGHT*0.6, PLAYER_HEIGHT, 2, 10, 50);
        this.color = color;
        this.endGame = endGame;
        this.keys = [];
        this.keyPressListener = window.addEventListener("keydown", (e) =>  this.handleKeyPress(e));
        this.keyUpListener = window.addEventListener("keyup", (e) =>  this.handleKeyUp(e));
        if(TouchController.isTouchEnabled()){
            this.controller = new TouchController(this.addKey, this.removeKey);
        }
        this.walkFrames = [];
        const playerFrame0 = new Image();
        playerFrame0.src = player0;
        this.walkFrames.push(playerFrame0);
        const playerFrame1 = new Image();
        playerFrame1.src = player1;
        this.walkFrames.push(playerFrame1);
        const playerFrame2 = new Image();
        playerFrame2.src = player2;
        this.walkFrames.push(playerFrame2);
        const playerFrame3 = new Image();
        playerFrame3.src = player3;
        this.walkFrames.push(playerFrame3);
        this.image = this.walkFrames[0];
        this.walkPosition = 0;
        this.allowUp = true;
        this.extras = getProducts().filter(p => p.bought && p.equipped);
        loadJetPackFrames();
        this.hasJetPack = false;
        this.hasLazer = false;
        this.enableExtras();
        this.lazerPos = [0, 0];
        if(this.hasJetPack){
            this.jetpack = new JetPack(65-JETPACK_WIDTH*0.15, 0);
        }
        if(this.hasLazer){
            this.mouseListener = document.addEventListener("mousemove", this.updateLazer);
        }
    }

    updateLazer = (e) => {
        this.lazerPos = [e.clientX, e.clientY];
    }

    enableExtras = () => {
        this.extras.forEach(e => {
            if(e.name == "Jet Pack"){
                this.hasJetPack = true;
            }
            if(e.name == "Laser Gun"){
                this.hasLazer = true;
            }
        });
    }

    addKey = (k) => {
        switch(k){
            case "arrowup":
            case "w":
                if(this.keys.indexOf("up") === -1 && this.allowUp){
                    this.keys.push("up");
		            this.allowUp = false;
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

    handleKeyPress = (e) => {
        this.addKey(e.key.toLowerCase());
    }

    removeKey = (k) => {
        switch(k){
            case "arrowup":
            case "w":
                if(this.keys.indexOf("up") != -1){
                    this.keys.splice(this.keys.indexOf("up"), 1);
                }
		        this.allowUp = true;
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

    handleKeyUp = (e) => {
        this.removeKey(e.key.toLowerCase());
    }

    updateSprite = (deltaTime, grounds, updateCameraOffset, offset) => {
        const relevantGrounds = this.getRelevantGrounds(grounds);
        const onGround = this.onGround(relevantGrounds);
        this.keys.forEach(k => {
            if(onGround){
                switch(k){
                    case "up":
                        this.keys.splice(this.keys.indexOf("up"), 1);
                        this.velocityY -= this.acceleration*3*deltaTime;
                        if(this.hasJetPack){
                            this.velocityY -= this.acceleration*3*deltaTime;
                        }
			            break;
                    case "down":
                        //this.velocityY += this.accelera*deltaTime;
                        break;
                }
            }
            switch(k){
                case "right":
                    this.velocityX += this.acceleration*deltaTime
                    break;
                case "left":
                    this.velocityX -= this.acceleration*deltaTime
                    break;
            }
        });
        if(this.velocityX != 0 && onGround){
            this.walkPosition = this.animate(this.walkFrames, this.walkPosition, 0.2);
        }else{ 
            this.image = this.walkFrames[0];
            this.walkPosition = 0;
        }
        this.update(deltaTime, relevantGrounds);
        if(this.x < offset){
            this.x = offset;
        }
        updateCameraOffset(this.x, -this.y);
    }

    render = (canvas, context, cameraOffset) => {
        if(this.hasJetPack){
            this.jetpack.render(context, canvas, this.velocityY < 0);
            if(this.keys.indexOf("left") == -1){
                this.jetpack.flipDirection(1);
            }else{
                this.jetpack.flipDirection(-1);
            }
        }
        if(this.keys.indexOf("left") == -1){
            context.drawImage(this.image, 50-this.height*0.2, canvas.height/2-this.height, this.height, this.height);
        }else{
            drawImageFlipped(context, this.image, 50-this.height*0.2, canvas.height/2-this.height, this.height, this.height);
        }

        if(this.hasLazer){
            const y =  canvas.height/2-this.height*0.5;
            const x =  50+this.height*0.6;
            const dist = Math.sqrt(Math.pow(x-this.lazerPos[0], 2) + Math.pow(y-this.lazerPos[1], 2));
            const theta = Math.atan((this.lazerPos[1]-y)/(this.lazerPos[0]-x));
            const segs = Math.floor(dist/50);
            context.fillStyle = "red";
            const xComponent = 50*Math.cos(theta);
            const yComponent = 50*Math.sin(theta);
            for(let s = 1; s <= segs; s++){
                let rad = 5;
                if(s == segs){
                    rad = 10;
                }
                context.beginPath();
                context.arc(x+xComponent*s, y+yComponent*s, rad, 0, Math.PI*2);
                context.closePath();
                context.fill();  
            } 
        }   
    }

    killRobots = (robots) => {
        const killIndexes = [];
        robots.forEach((r, i) => {
            if(this.collides(r)){
                if(this.topCollision(r) || this.velocityY < 0 || this.y+this.height < r.y+20){
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
        this.endPlayer();
        this.endGame();
    }

    endPlayer = () => {
        this.removeEventListeners();
        if(this.controller){
            this.controller.removeElements();
            delete this.controller;
        }
    }

    removeEventListeners = () => {
        window.removeEventListener("keydown", this.handleKeyPress);
        window.removeEventListener("keyup", this.handleKeyUp);
        if(this.hasLazer){
            document.removeEventListener("mousemove", this.mouseListener);
        }
    }
}
