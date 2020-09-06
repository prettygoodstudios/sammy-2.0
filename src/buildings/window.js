export default class Window {
    constructor(x, y){
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.color = "white";
    }

    render = (context, canvas) => {
        context.fillStyle = this.color;
        const remainder = canvas.height - this.y;
        const windowHeight = Math.ceil(remainder/this.height);
        for(let i = 0; i < windowHeight; i++){
            context.fillRect(this.x, this.y+i*this.height, this.width, this.height);
        }
    }
}