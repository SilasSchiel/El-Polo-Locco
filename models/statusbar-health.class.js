class StatusbarHealth extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    percantage = 100;

    constructor() {
        super().loadImg('img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png');
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * 
     * @param {number} percantage - Current percantage 
     * Sets the current percentage value 
     */
    setPercentage(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * 
     * @returns Shows the matching picture.
     */
    resolveImageIndex() {
        if(this.percantage == 100) {
            return 5;
        } else if(this.percantage > 80) {
            return 4;
        } else if(this.percantage > 60) {
            return 3;
        } else if(this.percantage > 40) {
            return 2;
        } else if (this.percantage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}