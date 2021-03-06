import { animate } from "../helpers/animation";
import PhysicalObject from "../physics/object";
import Player from "./player";

export default abstract class Sprite extends PhysicalObject {
    constructor(x: number, y: number, width: number, height: number, acceleration: number, drag: number, maxSpeed: number){
        super(x, y, width, height, acceleration, drag, maxSpeed);
    }

    abstract updateSprite(deltaTime: number, grounds: number): void;

    abstract render(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, cameraOffset: number, player: Player, offset: Array<number>) : void;

    animate = (sprites: Array<ImageBitmap>, position: number, rate: number=0.2) => {
        return animate(this, sprites, position, rate);
    }
}