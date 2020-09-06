export default class Sky {
    constructor(){
        this.backgroundColor = "blue";
    }

    render(context, canvas){
        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}