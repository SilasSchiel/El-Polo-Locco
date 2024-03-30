class Character extends MoveableObject {
    y = 100;
    height = 280;
    width = 120;
    speed = 5;

    IMAGES_NORMAL = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;

    constructor(moveLeft, moveRight, jump) {
        super().loadImg('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_NORMAL);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEPING);

        this.sleepTimer = null;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.timeLastAction = new Date().getTime(); // Zeit des letzten Ereignisses (z. B. Tastendruck)
        this.sleepingAnimationTimeout = null; // Timeout-Referenz für die Schlafanimation
        document.getElementById(moveLeft).addEventListener('touchstart', () => {
            if(mobileGameBreak) {
                this.isMovingLeft = true;
                this.movingLeft();
            }
        });

        document.getElementById(moveRight).addEventListener('touchstart', () => {
            if(mobileGameBreak) {
                this.isMovingRight = true;
                this.movingRight();
            }
        });

        document.getElementById(jump).addEventListener('touchstart', () => {
            if(mobileGameBreak) {
                this.characterMoveJump();
            }
        });
    }

    initializeCharacter()  {
        this.applyGravity();
        this.animateWalk();
        setStoppableInterval(() => this.intervalForMovement(), 1000 / 60);
        setStoppableInterval(() => this.intervalForAnimation(), 100);
    }

    offset = {
        top: 100,
        right: 20,
        bottom: 10,
        left: 20,
    };

    animateWalk() {
        this.intervalForMovement();
        this.intervalForAnimation();
    }

    intervalForAnimation() {
        const now = new Date().getTime();
        const timeSinceLastAction = now - this.timeLastAction;

        if (this.isHurt()) {
            this.timeLastAction = now;
            this.playAnimation(this.IMAGES_HURTING);
        } else if (this.isDead()) {
            if(this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                document.getElementById('if-you-lost-container').style.display = 'flex';
                document.getElementById('after-start-game-container').style.display = 'none';
                if(gameOverSound) {
                    this.gameOver.play();
                } else {
                    this.gameOver.pause();
                }
                stopGame();
            }
        } else if (this.isAboveGround()) {
            this.timeLastAction = now;
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.timeLastAction = now;
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                if (timeSinceLastAction >= 4000) {
                    this.sleep();
                } else {
                    this.playAnimation(this.IMAGES_NORMAL);
                }
            }
        }
    }

    sleep() {
        this.playAnimation(this.IMAGES_SLEEPING);
    }

    timePassedSinceLastAction() {
        return (new Date().getTime() - this.timeLastAction) / 1000;
    }
    
    
    intervalForMovement() {
        this.charakterRun.pause();
        if(this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
            this.moveRight();
            this.otherDirection = false;
            this.characterRunSound();
        }

        if(this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;  
            this.characterRunSound();
        }

        if(this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.characterJumpSounds();
        }
        this.world.camera_x = -this.x + 150;
    }

    characterRunSound() {
        if(characterRunSounds) {
            this.charakterRun.play();
        } else {
            this.charakterRun.pause();
        }
    }

    characterJumpSounds() {
        if(characterJumpSound) {
            this.characterJump.play();
        } else {
            this.characterJump.pause();
        }
    }

    // Mobile Touch Event

    movingLeft() {
        if(this.isMovingLeft = true) {
            if(this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;  
                this.characterRunSound();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    movingRight() {
        if(this.isMovingRight = true) {
            if(this.x < this.world.level.levelEnd_x) {
                this.moveRight();
                this.otherDirection = false;
                this.characterRunSound();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    characterMoveJump() {
        if(!this.isAboveGround()) {
            this.jump();
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }
}