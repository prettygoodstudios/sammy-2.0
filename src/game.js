import Sky from "./landscapes/sky";
import Window from "./buildings/window";
import Player, { PLAYER_HEIGHT } from "./sprites/player";
import Robot, { ROBOT_HEIGHT } from "./sprites/robot";

export default class Game {
    constructor(){
        this.canvas = document.getElementById("world");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.lastUpdate = new Date().getTime();
        this.cameraOffset = [0, Math.floor(this.canvas.height/2)];
        this.sky = new Sky(this.canvas);
        this.initialPlayerPosition = 50;
        this.generateBuildings();
        this.player = new Player(this.initialPlayerPosition, -300, "red", this.buildings);
        window.requestAnimationFrame(this.animate);
    }

    animate = () => {
        const currentTime = new Date().getTime()
        const deltaTime = currentTime  - this.lastUpdate;
        this.lastUpdate = currentTime;
        this.renderBackground();
        this.renderBuildings(deltaTime);
        this.player.updatePlayer(deltaTime, this.updateCameraOffset, this.buildings, this.initialPlayerPosition);
        this.player.render(this.canvas, this.context, this.cameraOffset);
        window.requestAnimationFrame(this.animate);
    }

    renderBackground = () => {
        this.sky.render(this.context, this.canvas, this.cameraOffset);
    }

    generateBuildings = () => {
        this.buildings = [];
        let count = 0;
        let top = PLAYER_HEIGHT;
        this.robots = [];
        for(let i = 0; i < 20; i++){
            const blockLength = Math.floor(Math.random()*8)+6;
            const left = count*50;
            for(let j = 0; j < blockLength; j++){
                this.buildings.push(new Window(left+j*50, top));
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
            r.updateRobot(deltaTime, this.buildings);
            r.render(this.context, this.canvas, this.cameraOffset, this.player, this.initialPlayerPosition);
        });
    }

    updateCameraOffset = (x = this.cameraOffset[0], y = this.cameraOffset[1]) => {
        this.cameraOffset = [x, y];
    }
}