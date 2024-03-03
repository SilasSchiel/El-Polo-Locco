class DrawableObject {
    x = 120;
    y = 240;
    height = 200;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof ThrowableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawBorderOffset(ctx) {
        if(this instanceof Character || this instanceof Coins || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle =  'red';
            ctx.rect(this.x - this.offset.left, this.y - this.offset.bottom, this.width - this.offset.right, this.height - this.offset.top);
            ctx.stroke();
        }
    }
}