class ThrowableObject extends MoveableObject {
    width = 80;
    height = 60;
    throwingBottle = new Audio('./audio/throwing.mp3');

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

    throw() {
        this.speedY = 20;
        this.applyGravity();
        const ground = 350;
        if(throwingBottleSound) {
            this.throwingBottle.play();
        } else {
            this.throwingBottle.pause();
        }
        
    
        if(this.speedY > 0) {
            this.intervalThrow = setInterval(() => {

                if(!this.isSplash) {
                    if(world.character.otherDirection == false) {
                        this.x += 10;
                    } 
                    
                    if(world.character.otherDirection == true) {
                        this.x -= 10;
                    }
                    if(this.y >= ground) {
                        this.y = ground;
                        this.splash();
                    }
                }
            }, 1000 / 60);  
        } 

        setInterval(() => {
            if(this.isSplash) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 1000 / 60);
    }

    splash() { 
        this.isSplash = true;
        clearInterval(this.intervalThrow);
    }

}