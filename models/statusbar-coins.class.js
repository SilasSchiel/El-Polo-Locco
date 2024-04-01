class StatusbarCoins extends DrawableObject {

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    percantage = 0;

    constructor() {
        super().loadImg('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 0;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setPercentageCoin(0);
    }

    /**
     * 
     * @param {number} percantage - Current percantage.
     * Sets the current percentage value. 
     */
    setPercentageCoin(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
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
        } else if (this.percantage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}