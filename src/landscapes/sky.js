export default class Sky {
    constructor(canvas){
        this.backgroundColor = "lightblue";
        this.cloudColor = "#ececec";
        this.clouds = [];
        this.width = canvas.width*10;
        this.height = canvas.height;
        this.generateClouds();
    }

    generateClouds(){
        const numberOfClouds = Math.floor(Math.random()*20)+5;
        let x = Math.floor(Math.random()*this.width/numberOfClouds);
        for(let i = 0; i < numberOfClouds; i++){
            const cloud = {
                x,
                y: Math.floor(Math.random()*this.height/2)
            }
            x+= Math.floor(Math.random()*this.width/numberOfClouds);
            this.clouds.push(cloud);
        }
    }

    render(context, canvas, cameraOffset){
        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.clouds.forEach(c => {
            context.fillStyle = this.cloudColor;
            context.fillRect(c.x-Math.floor(cameraOffset[0]*0.2)%this.width+50, c.y-50, 100, 50);
            context.fillRect(c.x-Math.floor(cameraOffset[0]*0.2)%this.width+25, c.y-25, 25, 25);
            context.fillRect(c.x-Math.floor(cameraOffset[0]*0.2)%this.width+150, c.y-25, 25, 25);
            context.fillRect(c.x-Math.floor(cameraOffset[0]*0.2)%this.width, c.y, 200, 50);
        });
    }
}