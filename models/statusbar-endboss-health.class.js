class StatusbarEndbossHealth extends DrawableObject {

    IMAGES_ENDBOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    percantage = 100;

    constructor() {
        super().loadImg('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
        this.loadImages(this.IMAGES_ENDBOSS_HEALTH);
        this.x = 500;
        this.y = 10 ;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES_ENDBOSS_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.percantage == 100) {
            return 5;
        } else if(this.percantage > 80) {
            return 4;
        } else if(this.percantage > 60) {
            return 3;
        } else if(this.percantage > 40) {
            return 2;
        } else if (this.percantage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}