export default class Geometry {

    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;

    constructor(x: number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collides = (geometry: Geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const top = this.y+this.height >= geometry.y;
        const bottom = this.y <= geometry.y+geometry.height;
        return left && right && top && bottom;
    }

    belowCollides = (geometry: Geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const bottom = this.y <= geometry.y+geometry.height;
        return left && right && bottom;
    }

    topCollision = (geometry: Geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const top = this.y+this.height >= geometry.y;
        const bottom = this.y+this.height <= geometry.y;
        return left && right && top && bottom;
    }

    sideCollision = (geometry: Geometry, margin: number = 0, useBottom: boolean = false) => {
        const left = this.x + this.width >= geometry.x - margin;
        const right = this.x <= geometry.x + geometry.width + margin;
        const top = this.y+this.height >= geometry.y + geometry.height+10;
        const bottom = !useBottom || this.y <= geometry.y+geometry.height;
        return left && top && right && bottom;
    }

    rightCollision = (geometry: Geometry, margin: number = 0) => {
        return this.sideCollision(geometry, margin) && geometry.x < this.x+this.width;
    }

    leftCollision = (geometry: Geometry, margin: number = 0) => {
        return this.sideCollision(geometry, margin) && geometry.x > this.x;
    }

    inFrame = (cameraOffset: Array<number>, canvas: HTMLCanvasElement) => {
        const toTheRight = this.x-cameraOffset[0]+this.width+50 > 0;
        const toTheLeft = this.x-cameraOffset[0] < canvas.width;
        return toTheRight && toTheLeft;
    }

    toRightOfFrame = (cameraOffset, canvas) => {
        return this.x-cameraOffset[0]+this.width > canvas.width;
    }

}