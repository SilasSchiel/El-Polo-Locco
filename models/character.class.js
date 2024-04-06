class Character extends MoveableObject {
    y = 100;
    height = 280;
    width = 120;
    speed = 5;

    offset = {
        top: 100,
        right: 20,
        bottom: 10,
        left: 20,
    };

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

    constructor() {
        super().loadImg('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_NORMAL);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadAudio('audio/collect-coin.mp3');
        this.sleepTimer = null;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.timeLastAction = new Date().getTime(); // Zeit des letzten Ereignisses (z. B. Tastendruck)
        this.sleepingAnimationTimeout = null; // Timeout-Referenz für die Schlafanimation
    }
    
    /**
     * 
     * Initializes necessary gravity and movements for the character
     */
    initializeCharacter()  {
        this.applyGravity();
        this.animateWalk();
        setStoppableInterval(() => this.intervalForMovement(), 1000 / 60);
        setStoppableInterval(() => this.intervalForAnimation(), 100);
    }

    /**
     * 
     * Animations and movements are called.
     */
    animateWalk() {
        this.intervalForMovement();
        this.intervalForAnimation();
    }

    /**
     * 
     * Interval for the Charatcer Animations in different Situations.
     */
    intervalForAnimation() {
        const now = new Date().getTime();
        const timeSinceLastAction = now - this.timeLastAction;
        if (this.isHurt()) {
            this.timeLastAction = now;
            this.characterIsHurt();
        } else if (this.isDead()) {
            if(this.energy <= 0) {
                this.characterIsDead();
            }
        } else if (this.isAboveGround()) {
            this.timeLastAction = now;
            this.characterIsJumping();
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.timeLastAction = now;
                this.characterIsMoving();
            } else {
                this.characterIsSleeping(timeSinceLastAction);
            }
        }
    }

    /**
     * 
     * Play animation when charcter is hurt.
     */
    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURTING);
    }

    /**
     * 
     * Play animation when character is dead and stop game.
     */
    characterIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.gameOverScreen();
        this.world.sounds.endbossMusic.pause();
        this.world.sounds.gameOver.play();
        stopGame();
    }

    /**
     * 
     * Play animation when character is jumping.
     */
    characterIsJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * 
     * Play aimation when character is walking.
     */
    characterIsMoving() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * 
     * @param {number} timeSinceLastAction - Safe the time after the last action 
     * At first the normal animation plays, but after 4 seconds the character goes into the sleeping animation
     */
    characterIsSleeping(timeSinceLastAction) {
        if (timeSinceLastAction >= 4000) {
            this.sleep();
        } else {
            this.playAnimation(this.IMAGES_NORMAL);
        }
    }

    /**
     * 
     * Shows the Game Over screen.
     */
    gameOverScreen() {
        document.getElementById('if-you-lost-container').style.display = 'flex';
        document.getElementById('after-start-game-container').style.display = 'none';
    }

    /**
     * 
     * Play the animation when character is sleeping.
     */
    sleep() {
        this.playAnimation(this.IMAGES_SLEEPING);
    }

    /**
     * 
     * @returns A new timestamp - the last timestamp. To save a time window.
     */
    timePassedSinceLastAction() {
        return (new Date().getTime() - this.timeLastAction) / 1000;
    }
    
    /**
     * 
     * When different keys are pressed, movements happen
     */
    intervalForMovement() {
        this.world.sounds.charakterRun.pause();
        this.characterMoveToRight();
        this.characterMoveToLeft();
        this.characterJumping();
        this.world.camera_x = -this.x + 150;
    }

    /**
     * 
     * Character Move To the right.
     */
    characterMoveToRight() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
            this.moveRight();
            this.otherDirection = false;
            this.characterRunSound();
        }
    }

    /**
     * 
     * Character move to the left.
     */
    characterMoveToLeft() {
        if(this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;  
            this.characterRunSound();
        }
    }

    /**
     * 
     * character jump.
     */
    characterJumping() {
        if(this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.characterJumpSounds();
        }
    }

    /**
     * 
     * Sound when character is run.
     */
    characterRunSound() {
        if(characterRunSounds) {
            this.world.sounds.charakterRun.play();
        } else {
            this.world.sounds.charakterRun.pause();
        }
    }

    /**
     * 
     * Sound when character is jumping.
     */
    characterJumpSounds() {
        if(characterJumpSound) {
            this.world.sounds.characterJump.play();
        } else {
            this.world.sounds.characterJump.pause();
        }
    }
}