import Sky from "./landscapes/sky";
import Ground, { LEFT_GROUND_POSITION, MIDDLE_GROUND_POSITION } from "./grounds/ground";
import Player, { PLAYER_HEIGHT } from "./sprites/player";
import Robot, { ROBOT_HEIGHT } from "./sprites/robot";
import { showGameOver, showMainMenu } from ".";
import Coin from "./landscapes/coin";
import PauseMenu from "./pauseMenu";
import Ufo from "./sprites/ufo";

export default class Game {
    constructor(){
        this.canvas = document.getElementById("world");
        this.context = this.canvas.getContext("2d");
        this.canvas.style.display = "block";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.lastUpdate = new Date().getTime();
        this.cameraOffset = [0, Math.floor(this.canvas.height/2)];
        this.sky = new Sky(this.canvas);
        this.initialPlayerPosition = 50;
        this.generateLandscape();
        this.player = this.initializePlayer();
        this.loop = window.requestAnimationFrame(this.animate);
        this.over = false;
        this.score = 0;
        this.paused = false;
        this.textColor = "#ececec";
        this.pause = new PauseMenu(() => this.paused = true, () =>  this.paused = false, () => {
            this.terminate();
            this.player.endPlayer();
            delete this.player;
            showMainMenu(); 
        });
    }

    initializePlayer(){
        return new Player(this.initialPlayerPosition, -300, "red", this.endGame);
    }

    animate = () => {
        const currentTime = new Date().getTime()
        const deltaTime = currentTime  - this.lastUpdate;
        this.lastUpdate = currentTime;
        if(!this.paused){
            this.renderBackground();
            this.renderLandscapes(deltaTime);  
            this.player.updateSprite(deltaTime, this.grounds, this.updateCameraOffset, this.initialPlayerPosition);
            this.player.render(this.canvas, this.context, this.cameraOffset);
            this.player.killRobots(this.robots);  
            this.player.collectCoins(this.coins, this.incrementScore);
            this.renderScore();
        }
        if(!this.over){
            this.loop = window.requestAnimationFrame(this.animate);
        }
    }

    renderScore = () => {
        this.context.font = "50px Avenir";
        this.context.fillStyle = this.textColor;
        this.context.fillText(this.score, this.canvas.width-50, 50);
    }

    renderBackground = () => {
        this.sky.render(this.context, this.canvas, this.cameraOffset);
    }

    generateLandscape = () => {
        this.grounds = [];
        let count = 0;
        let top = PLAYER_HEIGHT;
        this.robots = [];
        this.coins = [];
        this.ufos = [];
        for(let i = 0; i < 80; i++){
            const blockLength = Math.floor(Math.random()*8)+6;
            const left = count*50;
            let coinPlaced = false;
            for(let j = 0; j < blockLength; j++){
                let position = MIDDLE_GROUND_POSITION;
                if(i-1 >= 0 && j == 0){
                    position = LEFT_GROUND_POSITION;
                }else if (j == blockLength-1){
                    position = "right";
                }
                this.grounds.push(new Ground(left+j*50, top, position));
                if(!coinPlaced && Math.random() > 0.95){
                    coinPlaced = true;
                    const coin = new Coin(left+j*50, top-50, 25);
                    this.coins.push(coin);
                }
            }
            if(Math.random() > 0.5){
                const robot = new Robot(left, top-ROBOT_HEIGHT, 1);
                this.robots.push(robot);
            }
            if(Math.random() > 0.5){
                const dragon = new Ufo(left, top-500);
                this.ufos.push(dragon);
            }
            top += Math.floor(Math.random()*300)-150;
            count += blockLength;
        }
    }

    renderLandscapes = (deltaTime) => {
        for(const b of this.grounds){
            if(b.inFrame(this.cameraOffset, this.canvas)){
                b.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
            }else if(b.toRightOfFrame(this.cameraOffset, this.canvas)){
                break;
            }
        }
        this.robots.forEach(r => {
            if(r.inFrame(this.cameraOffset, this.canvas)){
                r.updateSprite(deltaTime, this.grounds);
                r.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
            }
        });
        this.ufos.forEach(d => {
            if(d.inFrame(this.cameraOffset, this.canvas)){
                d.updateSprite(deltaTime, this.grounds);
                d.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
            }
        });
        for(const c of this.coins){
            if(c.inFrame(this.cameraOffset, this.canvas)){
                c.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
            }else if(c.toRightOfFrame(this.cameraOffset, this.canvas)){
                break;
            }
        }
    }

    updateCameraOffset = (x = this.cameraOffset[0], y = this.cameraOffset[1]) => {
        this.cameraOffset = [x, y];
    }

    incrementScore = (score) => {
        this.score += score;
    }

    terminate = () => {
        this.pause.remove();
        window.cancelAnimationFrame(this.loop);
        this.over = true;
        delete this.grounds;
        delete this.pause;
        delete this.sky;
        delete this.coins;
        delete this.robots;
        delete this.ufos;
    }

    endGame = () => {
        this.terminate();
        delete this.player;
        showGameOver(this.score);
    }
}