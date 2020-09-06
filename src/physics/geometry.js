export default class Geometry {

    collides = (geometry) => {
        const left = geometry.x+geometry.width > this.x;
        const right = geometry.x < this.x+this.width;
        const top = geometry.y + geometry.height > this.y;
        const bottom = geometry.y < this.y+this.height;
        console.log(left, right, top, bottom);
        return left && right && top && bottom;
    }

}