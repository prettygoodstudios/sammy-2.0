import cloud from "../assets/Cloud.svg";

export default class Sky {
    constructor(canvas){
        this.backgroundColor = "#4fc3f7";
        this.cloudColor = "#ececec";
        this.clouds = [];
        this.width = canvas.width*10;
        this.height = canvas.height;
        this.cloud = new Image();
        this.cloud.src = cloud;
        this.cloud.width = 50;
        this.generateClouds();
    }

    generateClouds(){
        const numberOfClouds = Math.floor(Math.random()*20)+5;
        let x = Math.floor(Math.random()*this.width/numberOfClouds);
        for(let i = 0; i < numberOfClouds; i++){
            const cloud = {
                x,
                y: Math.floor(Math.random()*this.height/2),
                speed: Math.random()*0.4,
                size: 1+Math.random()
            }
            x+= Math.floor(Math.random()*this.width/numberOfClouds);
            this.clouds.push(cloud);
        }
    }

    render(context, canvas, cameraOffset){
        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.clouds.forEach(c => {
            context.drawImage(this.cloud, c.x-Math.floor(cameraOffset[0]*c.speed)%this.width, c.y, Math.floor(200*c.size), Math.floor(100*c.size));
        });
    }
}