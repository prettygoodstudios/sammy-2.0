import Sprite from "./sprite.ts";

import player0 from "../assets/Sammy1.svg";
import player1 from "../assets/Sammy2.svg";
import player2 from "../assets/Sammy3.svg";
import player3 from "../assets/Sammy4.svg";
import JetPack, { JETPACK_WIDTH, loadJetPackFrames } from "./jetpack";
import { getProducts } from "../helpers/db";
import { drawImageFlipped } from "../helpers/drawing";
import Geometry from "../physics/geometry";
import { JET_PACK_ID, LAZER_GUN_ID } from "../store/store";
import { insertionSort } from "../helpers/algos";


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


class LazerPelet extends Geometry{
    constructor(x, y, theta){
        super(x, y, 10, 10);
        this.theta = theta;
        this.velocity = 0.8;
    }

    update = (deltaTime) => {
        this.y += deltaTime*this.velocity*Math.sin(this.theta);
        this.x += deltaTime*this.velocity*Math.cos(this.theta);
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.x-cameraOffset[0]+offset, this.y+cameraOffset[1]+Math.floor(canvas.height/2)-player.height, this.width, 0, Math.PI*2);
        context.closePath();
        context.fill();
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
        this.lazerPelets = [];
        this.shoot = false;
        if(this.hasJetPack){
            this.jetpack = new JetPack(65-JETPACK_WIDTH*0.15, 0);
        }
        if(this.hasLazer){
            this.ammo = true;
            this.lastShot = new Date().getTime();
            this.mouseListener = document.addEventListener("mousemove", this.updateLazer);
            this.clickListener = document.getElementById("world").addEventListener("click", this.shootLazer);
        }
    }

    updateLazer = (e) => {
        this.lazerPos = [e.clientX, e.clientY];
    }

    shootLazer = (e) => {
        if(this.ammo){
            this.shoot = true;
            this.ammo = false;
            this.lastShot = new Date().getTime();
        }
    }

    enableExtras = () => {
        this.extras.forEach(e => {
            switch(e.id){
                case JET_PACK_ID:
                    this.hasJetPack = true
                    break;
                case LAZER_GUN_ID:
                    this.hasLazer = true;
                    break;
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
        if(this.hasLazer){
            const deadLazers = [];
            insertionSort(this.lazerPelets, (a, b) => a.x - b.x);
            const pelletGrounds = this.lazerPelets.length > 0 ? grounds.filter((g) => g.x + g.width >= this.lazerPelets[0].x && g.x <= this.lazerPelets[this.lazerPelets.length-1].x+this.lazerPelets[0].width) : [];
            this.lazerPelets.forEach((p, i) => {
                p.update(deltaTime);
                if(p.y < -2000 || Math.abs(p.x-this.x) > 4000){
                    deadLazers.push(i);
                }else{
                    pelletGrounds.forEach(pg => {
                        if(pg.belowCollides(p)){
                            deadLazers.push(i);
                        }
                    });
                }
            });

            deadLazers.forEach(dl => {
                this.lazerPelets.splice(dl, 1);
            })
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
            const xComponent = 50*Math.cos(theta);
            const yComponent = 50*Math.sin(theta);
            if(this.shoot){
                const pellet = new LazerPelet(this.x+this.width, this.y+this.height/2, theta);
                this.lazerPelets.push(pellet);
                this.shoot = false;
            }
            const deadPellets = [];
            this.lazerPelets.forEach((pellet, i) => {
                if(pellet.inFrame(cameraOffset, canvas)){
                    pellet.render(context, canvas, cameraOffset, this, 50);
                }else{
                    deadPellets.push(i);
                }
            }); 
            deadPellets.forEach(i => {
                this.lazerPelets.splice(i,1);
            });
            context.fillStyle = "red";
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
            let endWidth = this.width;
            if(!this.ammo){
                const proportion = (new Date().getTime() - this.lastShot)/2000;
                endWidth = proportion*this.width;
                if(proportion > 1){
                    this.ammo = true;
                }
            }
            context.strokeStyle = "red";
            context.strokeRect(x - this.width, y - this.height, this.width, 10);
            context.fillRect(x - this.width, y - this.height, endWidth, 10);
        }   
    }

    lazerKill = (robots, ufos) => {
        let killIndexes = [];
        robots.forEach((e, i) => {
            this.lazerPelets.forEach(p => {
                if(e.collides(p)){
                    killIndexes.push(i);
                }
            });
        });
        killIndexes.forEach(k => {
            robots.splice(k, 1);
        });
        killIndexes = [];
        ufos.forEach((e, i) => {
            this.lazerPelets.forEach(p => {
                if(e.collides(p)){
                    killIndexes.push(i);
                }
            });
        });
        killIndexes.forEach(k => {
            ufos.splice(k, 1);
        });
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
            document.getElementById("world").removeEventListener("click", this.clickListener);
        }
    }
}
