class Cloud extends MoveableObject {
    y = 50;
    width = 400;
    height = 200;

    constructor() {
        super().loadImg('./img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 3000;

        this.animate();
    }

    /**
     * 
     * Animate Cloud.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}