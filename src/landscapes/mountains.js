
import mountain from "../assets/Mountains.svg";

export default class Mountains {
    constructor(canvas){
        this.mountains = [];
        this.width = canvas.width*10;
        this.height = canvas.height;
        this.mountain = new Image();
        this.mountain.src = mountain;
        this.generateMountains();
    }

    generateMountains(){
        const numberOfMountains = Math.floor(Math.random()*5)+5;
        let x = Math.floor(Math.random()*this.width/numberOfMountains);
        for(let i = 0; i < numberOfMountains; i++){
            const mountain = {
                x,
                y: Math.floor(Math.random()*this.height/2)+this.height/3,
                speed: Math.random()*0.4,
                size: 1+Math.random()
            }
            x += Math.floor(this.width/numberOfMountains);
            this.mountains.push(mountain);
        }
    }

    render(context, canvas, cameraOffset){
        this.mountains.forEach(m => {
            context.drawImage(this.mountain, m.x-Math.floor(cameraOffset[0]*m.speed)%this.width, 400, Math.floor(1600*m.size), Math.floor(800*m.size));
        });
    }
}