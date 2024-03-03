class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;

    constructor(imagePath, x, y){
        super().loadImg(imagePath);
        this.y = y;
        this.x = x;
    }
}