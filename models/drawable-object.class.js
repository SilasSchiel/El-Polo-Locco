class DrawableObject {
    x = 120;
    y = 240;
    height = 200;
    width = 100;
    img;
    audio;
    imageCache = {};
    currentImage = 0;

    /**
     * 
     * @param {string} path - Path of the Images.
     * Load image of the objects.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    /**
     * 
     * @param {Array} arr - Array with many Images path.
     * Load images of the objects.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * 
     * @param {string} ctx - Canvas 
     * Draw loaded Images.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * 
     * @param {string} ctx - Canvas
     * Draw a border around the objects.
     */
    drawBorder(ctx) {
        if(this instanceof Character || this instanceof SmallChicken || this instanceof Coins || this instanceof ThrowableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * 
     * @param {string} ctx - Canvas
     * Draw a border around the objects with offsets.
     */
    drawBorderOffset(ctx) {
        if(this instanceof Character || this instanceof Coins || this instanceof SmallChicken || this instanceof NormalChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle =  'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}