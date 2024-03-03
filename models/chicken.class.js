class Chicken extends MoveableObject {
    y = 350;
    width = 80;
    height = 80;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    offset = {
        top: 20,
        bottom: -10,
        left: -10,
        right: 20
    }

    constructor() {
        super().loadImg('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.isAlive = true;

        this.x = 500 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        this.moveLeftIntervall = setInterval(() => {
            if (this.isAlive) {
                this.moveLeft();
            } else {
                clearInterval(this.moveLeftIntervall); 
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if(this.isAlive) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(this.moveLeftIntervall); 
                this.playAnimation(this.IMAGES_DEAD);                
            }
        }, 200);
    }
    

    markAsDead() {
        this.isAlive = false;
    }
}

