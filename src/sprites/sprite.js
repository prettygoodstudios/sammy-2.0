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
}