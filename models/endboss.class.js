class Endboss extends MoveableObject  {    
    y = 50;
    width = 250;
    height = 400;
    lastHitEndboss = 0;
    

    offset = {
        top: 40, 
        right: 10,
        bottom: 10,
        left: 20,
    };
    
    IMAGES_ENDBOSS = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ENDBOSS_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    IMAGES_ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    constructor(world = null) {
        super().loadImg('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.world = world;
        this.loadImages(this.IMAGES_ENDBOSS_HURTING);
        this.loadImages(this.IMAGES_ENDBOSS);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);

        this.x = 2000;
    }

    /**
     * 
     * Initialize the endboss.
     */
    initializeEndboss() {
        this.animate();
        setStoppableInterval(() => this.intervalEndbossMove(), 1000 / 60);
        setStoppableInterval(() => this.intervalAnimationEndboss(), 200);
    }

    /**
     * 
     * @param {array} eb - Access to endboss.
     * When character hit the endboss.
     */
    characterHitEndboss(eb) {
        this.enbossLosesEnergy();
        this.checkIfEndbossIsAlife();
        this.setTheEnergyToStatusbar();
    }

    /**
     * 
     * Endboss loss energy.
     */
    enbossLosesEnergy() {
        this.energyEndboss -= 4;
    }

    /**
     * 
     * Check whether the final boss is still alive
     */
    checkIfEndbossIsAlife() {
        if(this.energyEndboss < 0) {
            this.energyEndboss = 0;
            this.isAlive = false;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    /**
     * 
     * Adjusts the boss's status bar based on his Energy.
     */
    setTheEnergyToStatusbar() {
        this.world.statusBarEndbossHealth.setPercentage(this.energyEndboss);
    }


    /**
     * 
     * @returns Stores the time span from the last attack.
     */
    lastAttackEndboss() {
        let timepassedAttack = (new Date().getTime() - this.lastAttack) / 1000;
        return timepassedAttack < 0.7;
    }

    /**
     * 
     * @returns Stores the time span from the last hurt.
     */
    isHurtEndboss() {
        let timepassedEndboss = (new Date().getTime() - this.lastHitEndboss) / 1000;
        return timepassedEndboss < 0.7;
    }

    /**
     * 
     * @returns Check if Endboss is dead.
     */
    isEndbossDead() {
        return this.energyEndboss == 0;
    }

    /**
     * 
     * Animate the endboss.
     */
    animate() {
        this.intervalEndbossMove();
        this.intervalAnimationEndboss();
    }

    /**
     * 
     * Check if the endboss move left or right.
     */
    intervalEndbossMove() {
        this.endbossMoveLeft();
        this.endbossMoveRight();
    }

    /**
     * 
     * Checks if the endboss move left.
     */
    endbossMoveLeft() {
        if(this.isAlive && !this.otherDirection && this.contactWidthEndboss) {
            this.moveLeft();
            this.speed = 1.2;
        } 
    }

    /**
     * 
     * Checks if the endboss move right.
     */
    endbossMoveRight() {
        if(this.otherDirection) {
            this.moveRight();
        }
    }

    /**
     * 
     * Displays the animations according to different situations.
     */
    intervalAnimationEndboss() {
        if(this.isHurtEndboss()) {
            this.playAnimation(this.IMAGES_ENDBOSS_HURTING);
        } else if(this.isEndbossDead()) {
            this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
            this.world.sounds.endbossMusic.pause();
            this.world.sounds.victory.play();
            stopGame();
            document.getElementById('if-game-over-container').style.display = 'flex';
            document.getElementById('after-start-game-container').style.display = 'none';
        } else if(this.lastAttackEndboss()) {
            this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
        } else {
            this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
        }
    }
}