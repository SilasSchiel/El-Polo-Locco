class SmallChicken extends MoveableObject {
    y = 350;
    width = 70;
    height = 70;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    }

    constructor() {
        super().loadImg('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.movingRight;

        const maxWidth = 1920 - 80 - 500; 
        this.x = (800 + Math.random() * maxWidth);
        this.speed = 1 + Math.random() * 1.5;
    }

    /**
     * 
     * Initialize the small chicken.
     */
    initializeSmallChicken() {
        this.animate();
        setStoppableInterval(() => this.intervalForAnimationSmallEnemies(), 200);
        setStoppableInterval(() => this.intervalForWalkSmallEnemies(), 1000 / 60);
    }   

    /**
     * 
     * Animatie the normal chicken for walk.
     */
    animate() {

        this.intervalForWalkSmallEnemies();
        this.intervalForAnimationSmallEnemies();
    }

    /**
     * 
     * When the object is alive then check the position and directition.
     */
    intervalForWalkSmallEnemies() {
        if (this.isAlive) {
            this.checkThePositionOfSmallEnemy();
            this.checkDirection();
        }
    }

    /**
     * 
     * Check if object is moving right or left.
     */
    checkThePositionOfSmallEnemy() {
        if (this.movingRight && this.x >= 2000) { 
            this.movingRight = false;
            this.otherDirection = false;
        } else if (!this.movingRight && this.x <= 0) { 
            this.movingRight = true;
            this.otherDirection = true;
        }
    }

    /**
     * 
     * Makes the object move to the right or left.
     */
    checkDirection() {
        if (this.movingRight) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    /**
     * 
     * Play Animation for the walking or dead enemy.
     */
    intervalForAnimationSmallEnemies() {
        if(this.isAlive) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            clearInterval(this.moveLeftIntervall); 
            this.playAnimation(this.IMAGES_DEAD);                
        }
    }
}

