import PhysicalObject from "../physics/object";

export default class Sprite extends PhysicalObject {
    constructor(x, y, width, height, acceleration, drag, maxSpeed){
        super(x, y, width, height, acceleration, drag, maxSpeed);
    }

    updateSprite = (deltaTime, grounds) => {
        throw new Error();
    }

    render = (context, canvas, cameraOffset, player, offset) => {
        throw new Error();
    }

    animate = (sprites, position, rate=0.2) => {
        const coeff = Math.ceil(1/rate);
        this.image = sprites[Math.floor(position/coeff)];
        position+=1;
        if(position >= sprites.length*coeff){
            position = 0;
        }
        return position;
    }
}