import Geometry from "../physics/geometry";

const NOT_IMPLEMENTED_ERROR = 'NOT_IMPLEMENTED!!!';

export default class Building extends Geometry {
    constructor(){
        super();
    }


    render = (canvas, context) => {
        throw Error(NOT_IMPLEMENTED_ERROR);
    }

    inFrame = (cameraOffset, canvas) => {
        const toTheRight = this.x-cameraOffset[0]+this.width+50 > 0;
        const toTheLeft = this.x-cameraOffset[0] < canvas.width;
        return toTheRight && toTheLeft;
    }

}