class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    charakterRun = new Audio('./audio/run.mp3');
    speedX = 0;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    energyEndboss = 100;
    lastHitCharacter = 0;
    lastAttack = 0;
    
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    isAlive = true;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 150;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    playAnimation(arr) {
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    rebounceJump() {
        this.speedY = 20;
    }

    isColliding(obj) {
        return  this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
        this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom &&
        this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
        this.y + this.height - this.offset.bottom > obj.y + obj.offset.top;
    }    

    hitEndboss() {
        this.energy -= 10;
        this.world.statusBarHealth.setPercentage(this.energy);
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            world.level.endboss.lastHitCharacter = new Date().getTime();
        }
    }

    hit() {
        this.energy -= 5;
        this.world.statusBarHealth.setPercentage(this.energy);
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHitCharacter = new Date().getTime();
        }
    }

    markAsDead() {
        this.isAlive = false;
    }

    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHitCharacter) / 1000;
        return timepassed < 0.7;
    }

    isDead() {
        return this.energy == 0;
    }

    collectCoin() {
        this.world.statusBarCoins.setPercentageCoin(this.world.coinCounter * 10);
    }

    collectBottle() {
         this.world.statusBarBottles.setPercentage(this.world.bottleCounter * 10);
    }
}