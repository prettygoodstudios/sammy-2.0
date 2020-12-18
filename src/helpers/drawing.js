export const drawImageFlipped = (context, img, x, y, width, height) => {
    context.save();
    context.translate(x + width/2, y + height/2);
    context.scale(-1,1);
    context.drawImage(img, -width/2, -height/2, width, height);
    context.restore();
}