class ThrowableObject extends MoveableObject {
    width = 80;
    height = 60;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;

        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);   
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 1000 / 60);
    }

}