

export const animate = (obj, sprites, position, rate=0.2) => {
    const coeff = Math.ceil(1/rate);
    obj.image = sprites[Math.floor(position/coeff)];
    position+=1;
    if(position >= sprites.length*coeff){
        position = 0;
    }
    return position;
}