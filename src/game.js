import Sky from "./landscapes/sky";
import Window from "./buildings/window";

export default class Game {
    constructor(){
        this.canvas = document.getElementById("world");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.lastUpdate = new Date().getTime();
        this.sky = new Sky();
        this.generateBuildings();
        window.requestAnimationFrame(this.animate);
    }

    animate = () => {
        const currentTime = new Date().getTime()
        const deltaTime = currentTime  - this.lastUpdate;
        this.lastUpdate = currentTime;
        this.renderBackground();
        this.renderBuildings();
        window.requestAnimationFrame(this.animate);
    }

    renderBackground = () => {
        this.sky.render(this.context, this.canvas);
    }

    generateBuildings = () => {
        this.buildings = [];
        let count = 0;
        let top = Math.floor(this.canvas.height/2);
        for(let i = 0; i < 10; i++){
            const blockLength = Math.floor(Math.random()*4)+6;
            const left = count*50;
            for(let j = 0; j < blockLength; j++){
                this.buildings.push(new Window(left+j*50, top));
            }
            top += Math.floor(Math.random()*300);
            count += blockLength;
        }
    }

    renderBuildings = () => {
        this.buildings.forEach(b => {
            b.render(this.context, this.canvas);
        });
    }
}