import Geometry from "../physics/geometry.ts";



const NOT_IMPLEMENTED_ERROR = 'NOT_IMPLEMENTED!!!';

export default class Landscape extends Geometry {
    constructor(x, y, width, height){
        super(x, y, width, height);
    }


    render = (canvas, context) => {
        throw Error(NOT_IMPLEMENTED_ERROR);
    }

}