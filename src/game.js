import Sky from "./landscapes/sky";
import Window, { instatiateGrassImages } from "./buildings/window";
import Player, { PLAYER_HEIGHT } from "./sprites/player";
import Robot, { constructRobotImages, ROBOT_HEIGHT } from "./sprites/robot";
import { showGameOver } from ".";
import Coin from "./landscapes/coin";

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
        constructRobotImages();
        instatiateGrassImages();
        this.generateBuildings();
        this.player = this.initializePlayer();
        this.loop = window.requestAnimationFrame(this.animate);
        this.over = false;
        this.score = 0;
        this.textColor = "#ececec";
    }

    initializePlayer(){
        return new Player(this.initialPlayerPosition, -300, "red", this.buildings, this.endGame);
    }

    animate = () => {
        const currentTime = new Date().getTime()
        const deltaTime = currentTime  - this.lastUpdate;
        this.lastUpdate = currentTime;
        this.renderBackground();
        this.renderBuildings(deltaTime);  
        this.player.updateSprite(deltaTime, this.buildings, this.updateCameraOffset, this.initialPlayerPosition);
        this.player.render(this.canvas, this.context, this.cameraOffset);
        this.player.killRobots(this.robots);  
        this.player.collectCoins(this.coins, this.incrementScore);
        this.renderScore();
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

    generateBuildings = () => {
        this.buildings = [];
        let count = 0;
        let top = PLAYER_HEIGHT;
        this.robots = [];
        this.coins = [];
        for(let i = 0; i < 20; i++){
            const blockLength = Math.floor(Math.random()*8)+6;
            const left = count*50;
            let coinPlaced = false;
            for(let j = 0; j < blockLength; j++){
                let position = "middle";
                if(i-1 >= 0 && j == 0){
                    position = "left";
                }else if (j == blockLength-1){
                    position = "right";
                }
                this.buildings.push(new Window(left+j*50, top, position));
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
            top += Math.floor(Math.random()*300)-150;
            count += blockLength;
        }
    }

    renderBuildings = (deltaTime) => {
        this.buildings.forEach(b => {
            if(b.inFrame(this.cameraOffset, this.canvas)){
                b.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
            }
        });
        this.robots.forEach(r => {
            r.updateSprite(deltaTime, this.buildings);
            r.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
        });
        this.coins.forEach(c => {
            c.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
        });
    }

    updateCameraOffset = (x = this.cameraOffset[0], y = this.cameraOffset[1]) => {
        this.cameraOffset = [x, y];
    }

    incrementScore = (score) => {
        this.score += score;
    }

    endGame = () => {
        window.cancelAnimationFrame(this.loop);
        this.over = true;
        showGameOver(this.score);
    }
}