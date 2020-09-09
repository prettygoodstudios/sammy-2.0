export default class Geometry {

    collides = (geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const top = this.y+this.height >= geometry.y;
        const bottom = this.y <= geometry.y+geometry.height;
        return left && right && top && bottom;
    }

    sideCollision = (geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const top = this.y+this.height >= geometry.y + 40;
        return left && top && right;
    }

    rightCollision = (geometry) => {
        return this.sideCollision(geometry) && geometry.x < this.x+this.width;
    }

    leftCollision = (geometry) => {
        return this.sideCollision(geometry) && geometry.x > this.x;
    }

    inFrame = (cameraOffset, canvas) => {
        const toTheRight = this.x-cameraOffset[0]+this.width+50 > 0;
        const toTheLeft = this.x-cameraOffset[0] < canvas.width;
        return toTheRight && toTheLeft;
    }

}