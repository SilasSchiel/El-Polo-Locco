class Coins extends MoveableObject {
    y = 310;
    width = 150;
    height = 150;

    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ]

    offset = {  
        top: 80, 
        bottom: -40,
        left: -40,
        right: 80 

    }

    constructor() {
        super().loadImg('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);

        this.x = 200 + Math.random() * 500;

        this.animate();
    }  

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}