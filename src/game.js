import Sky from "./landscapes/sky";

export default class Game {
    constructor(){
        this.canvas = document.getElementById("world");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.lastUpdate = new Date().getTime();
        this.sky = new Sky();
        window.requestAnimationFrame(this.animate);
    }

    animate = () => {
        const currentTime = new Date().getTime()
        const deltaTime = currentTime  - this.lastUpdate;
        this.lastUpdate = currentTime;
        this.renderBackground();
        window.requestAnimationFrame(this.animate);
    }

    renderBackground = () => {
        this.sky.render(this.context, this.canvas);
    }

    renderBuildings = () => {
        
    }
}