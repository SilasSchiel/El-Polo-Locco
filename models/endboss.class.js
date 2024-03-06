class Endboss extends MoveableObject  {    
    y = 50;
    width = 250;
    height = 400;
    lastHitEndboss = 0;
    
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

    constructor(world = null) {
        super().loadImg('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.world = world;
        this.loadImages(this.IMAGES_ENDBOSS_HURTING);
        this.loadImages(this.IMAGES_ENDBOSS);

        this.x = 2000;

        this.animate();
    }

    characterHitEndboss(eb) {
        this.energyEndboss -= 2;
        this.world.statusBarEndbossHealth.setPercentage(this.energyEndboss);

        if(this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
            console.log(this.lastHitEndboss);
        }
    }

    isHurtEndboss() {
        let timepassedEndboss = (new Date().getTime() - this.lastHitEndboss) / 1000;
        console.log(this.lastHitEndboss);
        return timepassedEndboss < 0.7;
    }


    animate() {
        setInterval(() => {
            if(this.isHurtEndboss()) {
                console.log(this.isHurtEndboss());
                this.playAnimation(this.IMAGES_ENDBOSS_HURTING);
            } else {
                this.playAnimation(this.IMAGES_ENDBOSS);
            }
        }, 200);
    }
}