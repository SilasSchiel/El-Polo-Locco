class NormalChicken extends MoveableObject {
    y = 350;
    width = 80;
    height = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
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

        const maxWidth = 1920 - 80 - 500; 
        this.x = (500 + Math.random() * maxWidth);
        this.speed = 0.15 + Math.random() * 0.25;
        this.movingRight;
    }

    /**
     * 
     * Initialize the normal chicken.
     */
    initializeNormalChicken() {
        this.animate();
        setStoppableInterval(() => this.intervalForAnimationNormalEnemies(), 200);
        setStoppableInterval(() => this.intervalForWalkNormalEnemies(), 1000 / 60);
    }

    /**
     * 
     * Animatie the normal chicken for walk.
     */
    animate() {
        this.intervalForAnimationNormalEnemies();
        this.intervalForWalkNormalEnemies();
    }

    /**
     * 
     * Animate when the enemy is walking.
     */
    intervalForAnimationNormalEnemies() {
        if(this.isAlive) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.isAlive = true;         
        }
    }

    /**
     * 
     * When the object is alive then check the position and directition.
     */
    intervalForWalkNormalEnemies() {
        if (this.isAlive) {
            this.checkThePositionOfNormalEnemy();
            this.checkDirection();
        }
    }

    /**
     * 
     * Check if object is moving right or left.
     */
    checkThePositionOfNormalEnemy() {
        if (this.movingRight && this.x > 300) { 
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
}
