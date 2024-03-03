class Endboss extends MoveableObject  {    
    y = 50;
    width = 250;
    height = 400;
    
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
    ]

    constructor() {
        super().loadImg('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ENDBOSS);

        this.x = 2000;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.isHurt()) {
                this.playAnimation(this.IMAGES_ENDBOSS_HURTING);
            } else {
                this.playAnimation(this.IMAGES_ENDBOSS);
            }
        }, 200);
    }
}