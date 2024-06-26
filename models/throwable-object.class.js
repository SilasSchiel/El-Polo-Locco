class ThrowableObject extends MoveableObject {
    width = 80;
    height = 60;
    throwingBottle = new Audio('./audio/throwing.mp3');
    throwDirection;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.isSplash = false;
        this.x = x;
        this.y = y;

        this.throw();
    }

    /**
     * 
     * Throw a bottle.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        const ground = 350;
        this.checkThrowingBottleSound();
        this.setThrowDirection();
        this.intervalForThrowingBottle(ground);
        this.intervalForAnimationBottle();
    }

    /**
     * 
     * Saves the character's direction for throwing the bottle
     */
    setThrowDirection() {
        this.throwDirection = world.character.otherDirection ? -1 : 1;
    }

    /**
     * 
     * @param {number} ground - Value that determines the ground.
     * An Interval that check the throwing of a bottle.
     */
    intervalForThrowingBottle(ground) {
        if(this.speedY > 0) {
            this.intervalThrow = setInterval(() => {
                this.checkIfTheBottleNotSplash(ground);
            }, 1000 / 60);  
        } 
    }

    /**
     * 
     * @param {number} ground - Value that determines the ground.
     * Check if the bottle not allready splash.
     */
    checkIfTheBottleNotSplash(ground) {
        if(!this.isSplash) {
            this.updateBottlePosition();
            this.checkIfTheBottleReachTheGround(ground);
        }
    }

    /**
     * 
     * Determines the direction of the bottle when thrown without the bottle following the character.
     */
    updateBottlePosition() {
        // Bewegt die Flasche basierend auf der Wurfrichtung
        this.x += 10 * this.throwDirection;
    }

    /**
     * 
     * @param {number} ground - Value that determines the ground.
     * When the bottom is reached, the bottle should shatter.
     */
    checkIfTheBottleReachTheGround(ground) {
        if(this.y >= ground) {
            this.y = ground;
            this.splash();
        }
    }

    /**
     * 
     * Here the animation for the throwing wrong person is determined.
     */
    intervalForAnimationBottle() {
        setInterval(() => {
            if(this.isSplash) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 1000 / 60);
    }

    /**
     * 
     * The sound of the throwing bottle.
     */
    checkThrowingBottleSound() {
        if(throwingBottleSound) {
            this.throwingBottle.play();
        } else {
            this.throwingBottle.pause();
        }
    }

    /**
     * 
     * This is where the bottle is bound to shatter.
     */
    splash() { 
        this.isSplash = true;
        clearInterval(this.intervalThrow);
    }

}