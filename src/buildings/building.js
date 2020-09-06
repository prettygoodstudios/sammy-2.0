const NOT_IMPLEMENTED_ERROR = 'NOT_IMPLEMENTED!!!';

export default class Building {
    constructor(){
    }


    render = (canvas, context) => {
        throw Error(NOT_IMPLEMENTED_ERROR);
    }

    inFrame = (cameraOffset, canvas) => {
        const toTheRight = this.x-cameraOffset[0]+this.width > 0;
        const toTheLeft = this.x-cameraOffset[0] < canvas.width;
        return toTheRight && toTheLeft;
    }
}