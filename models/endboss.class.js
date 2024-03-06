class Endboss extends MoveableObject  {    
    y = 50;
    width = 250;
    height = 400;
    lastHitEndboss = 0;
    lastAttack = 0;
    
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

    constructor(world = null) {
        super().loadImg('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.world = world;
        this.loadImages(this.IMAGES_ENDBOSS_HURTING);
        this.loadImages(this.IMAGES_ENDBOSS);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);

        this.x = 2000;

        this.animate();
    }

    characterHitEndboss(eb) {
        this.energyEndboss -= 4;
        this.world.statusBarEndbossHealth.setPercentage(this.energyEndboss);

        if(this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    attackEndboss() {
        return this.lastAttack = new Date().getTime();
    }

    lastAttackEndboss() {
        let timepassedAttack = (new Date().getTime() - this.lastAttack) / 1000;
        return timepassedAttack < 0.7;
    }

    isHurtEndboss() {
        let timepassedEndboss = (new Date().getTime() - this.lastHitEndboss) / 1000;
        return timepassedEndboss < 0.7;
    }

    isEndbossDead() {
        return this.energyEndboss == 0;
    }

    animate() {
        setInterval(() => {
            if(this.isHurtEndboss()) {
                this.playAnimation(this.IMAGES_ENDBOSS_HURTING);
            } else if(this.isEndbossDead()) {
                this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
            } else if(this.lastAttackEndboss()) {
                this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_ENDBOSS);
            }
        }, 200);
    }
}