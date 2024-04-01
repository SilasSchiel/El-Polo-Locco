class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    charakterRun = new Audio('./audio/run.mp3');
    characterJump = new Audio('./audio/jump.mp3');
    chickenAudio = new Audio('./audio/chicken.mp3');
    gameOver = new Audio('./audio/game-over.mp3');
    victory = new Audio('./audio/victory.mp3');
    speedX = 0;
    speedY = 0;
    acceleration = 2.5;
    energy = 300;
    energyEndboss = 100;
    lastHitCharacter = 0;
    lastAttack = 0;
    contactWidthEndboss = false;
    
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    isAlive = true;

    /**
     * 
     * Here gravity is added to the moving objects.
     */
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

    /**
     * 
     * Here is checked if the Objects above the ground.
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * 
     * @param {Array} arr - Array of the Images for the animations.
     * Here it is ensured that the animations for the individual objects are played.
     */
    playAnimation(arr) {
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * 
     * Objects can be move right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * 
     * Objects can be move left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * 
     * Objects can jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * 
     * Objects make a rebouce.
     */
    rebounceJump() {
        this.speedY = 20;
    }

    /**
     * 
     * @param {Array} obj - Objects that can collide.
     * @returns - Returns a calculation that checks a collision with 2 moving objects
     */
    isColliding(obj) {
        return  this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
        this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom &&
        this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
        this.y + this.height - this.offset.bottom > obj.y + obj.offset.top;
    }    

    /**
     * 
     * In a collision with the final boss, the character loses his energy.
     */
    hitEndboss() {
        this.energy -= 8;
        this.world.statusBarHealth.setPercentage(this.energy);
        this.checksIfCharacterLostEnergyFromEndboss();
    }

    /**
     * 
     * Checks whether the character's energy has reached zero or whether the character has suffered damage.
     */
    checksIfCharacterLostEnergyFromEndboss() {
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            world.level.endboss.lastHitCharacter = new Date().getTime();
            this.checkDamageCharacterSound();
        }
    }

    /**
     * 
     * In a collision width a enemy, the character loses his energy.
     */
    hit() {
        this.energy -= 3;
        this.world.statusBarHealth.setPercentage(this.energy);
        this.checksIfCharacterLostEnergyFromEnemy();
    }

    /**
     * 
     * Checks whether the character's energy has reached zero or whether the character has suffered damage.
     */
    checksIfCharacterLostEnergyFromEnemy() {
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHitCharacter = new Date().getTime();
            this.checkDamageCharacterSound();
        }
    }

    /**
     * 
     * Checks the sound when character get damage.
     */
    checkDamageCharacterSound() {
        if(damageCharacterSound) {
            this.world.damageCharacter.play();
        } else {
            this.world.damageCharacter.pause();
        }
    }

    /**
     * 
     * Enemies can be mark as dead.
     */
    markAsDead() {
        this.isAlive = false;
        this.checkDamageChickenSound();
    }

    /**
     * 
     * Checks the sound when chicken is dead.
     */
    checkDamageChickenSound() {
        if(damageChickenSound) {
            this.world.damageChicken.play();
        } else {
            this.world.damageChicken.pause();
        }
    }

    /**
     * 
     * @returns Time at which the character suffered damage 
     */
    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHitCharacter) / 1000;
        return timepassed < 0.7;
    }

    /**
     * 
     * @returns The character is dead when the energy is now zero.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * 
     * When a coin is collected, the status bar is also adjusted.
     */
    collectCoin() {
        this.world.statusBarCoins.setPercentageCoin(this.world.coinCounter * 10);
    }

    /**
     * 
     * When a bottle is collected, the status bar is also adjusted.
     */
    collectBottle() {
         this.world.statusBarBottles.setPercentage(this.world.bottleCounter * 10);
    }
}