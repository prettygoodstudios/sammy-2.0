import taipei from "../assets/Taipei.svg";
import pearl from "../assets/Pearl.svg";
import rail from "../assets/Rail.svg";
import train from "../assets/Train.svg";
import midrise from "../assets/Midrise.svg";


const TRAIN_RATIO = 0.1095008052;

export default class Urban {
    constructor(canvas){
        this.midrise = new Image();
        this.midrise.src = midrise;
        this.taipei = new Image();
        this.taipei.src = taipei;
        this.pearl = new Image();
        this.pearl.src = pearl;
        this.rail = new Image();
        this.rail.src = rail;
        this.train = new Image();
        this.train.src = train;
        this.rails = [];
        this.width = canvas.width*10;
        this.height = canvas.height;


        this.trains = [];
        this.buildings = [];

        this.buildingAssets = [
            this.midrise,
            this.taipei,
            this.pearl
        ];

        this.buildingRatios = [
            1.2397,
            2.893,
            1.20472
        ]

        this.generateUrbanAreas();
    }

    generateUrbanAreas(){
        const numberOfRails = 10;
        let x = 0;
        for(let i = 0; i < numberOfRails; i++){
            const rail = {
                x,
                y: 300,
                speed: 0.4,
                size: this.width/numberOfRails
            }
            if(Math.random()*100 < 50) {
                const train = {
                    x,
                    y: 300-50,
                    speed: 0.4,
                    size: this.width/numberOfRails*0.5
                }
                this.trains.push(train);
            }
            if(Math.random()*100 < 99){
                console.log(Math.floor(Math.random()*(this.buildingAssets.length)))
                const type = Math.floor(Math.random()*(this.buildingAssets.length));
                const building = {
                    x,
                    y: -100,
                    speed: 0.4,
                    size: this.width/numberOfRails*0.25,
                    img: this.buildingAssets[type],
                    ratio: this.buildingRatios[type]
                }
                this.buildings.push(building);
            }
            x += this.width/numberOfRails;
            this.rails.push(rail);
            
        }
    }

    render(context, canvas, cameraOffset){
        this.rails.forEach(r => {
            context.drawImage(this.rail, r.x-Math.floor(cameraOffset[0]*r.speed)%this.width, cameraOffset[1]+canvas.height/2, r.size+4, r.size*0.1);
        });
        this.trains.forEach(t => {
            t.x += 50
            t.x %= this.width;
            context.drawImage(this.train, t.x-Math.floor(cameraOffset[0]*t.speed)%this.width, cameraOffset[1]+canvas.height/2-t.size*TRAIN_RATIO, t.size, t.size*TRAIN_RATIO);
        });
        this.buildings.forEach(b => {
            context.drawImage(b.img, b.x-Math.floor(cameraOffset[0]*b.speed)%this.width, cameraOffset[1]+canvas.height/2+this.rails[0].size*0.1-b.size*b.ratio, b.size, b.size*b.ratio);
        });
        context.fillStyle = "gray";
        context.fillRect(0, cameraOffset[1]+canvas.height/2+this.rails[0].size*0.1, canvas.width, canvas.height/2);
    }
}