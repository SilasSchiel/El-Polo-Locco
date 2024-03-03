class StatusbarBottles extends DrawableObject {

    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    percantage = 100;

    constructor() {
        super().loadImg('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 0;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
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
        } else if (this.percantage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}