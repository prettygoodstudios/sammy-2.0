export default class Sky {
    constructor(canvas){
        this.backgroundColor = "blue";
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
            context.fillRect(c.x-cameraOffset[0]%this.width, c.y, 200, 50);
        });
    }
}