export default class Geometry {

    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collides = (geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const top = this.y+this.height >= geometry.y;
        const bottom = this.y <= geometry.y+geometry.height;
        return left && right && top && bottom;
    }

    topCollision = (geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const top = this.y+this.height >= geometry.y;
        const bottom = this.y+this.height <= geometry.y+10;
        return left && right && top && bottom;
    }

    sideCollision = (geometry, margin = 0, useBottom = false) => {
        const left = this.x + this.width >= geometry.x - margin;
        const right = this.x <= geometry.x + geometry.width + margin;
        const top = this.y+this.height >= geometry.y + geometry.height+10;
        const bottom = !useBottom || this.y <= geometry.y+geometry.height;
        return left && top && right && bottom;
    }

    rightCollision = (geometry, margin = 0) => {
        return this.sideCollision(geometry, margin) && geometry.x < this.x+this.width;
    }

    leftCollision = (geometry, margin = 0) => {
        return this.sideCollision(geometry, margin) && geometry.x > this.x;
    }

    inFrame = (cameraOffset, canvas) => {
        const toTheRight = this.x-cameraOffset[0]+this.width+50 > 0;
        const toTheLeft = this.x-cameraOffset[0] < canvas.width;
        return toTheRight && toTheLeft;
    }

    toRightOfFrame = (cameraOffset, canvas) => {
        return this.x-cameraOffset[0]+this.width > canvas.width;
    }

}