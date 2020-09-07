export default class Geometry {

    collides = (geometry) => {
        const left = this.x + this.width >= geometry.x;
        const right = this.x <= geometry.x + geometry.width;
        const top = this.y+this.height >= geometry.y;
        const bottom = this.y <= geometry.y+geometry.height;
        return left && right && top && bottom;
    }

}