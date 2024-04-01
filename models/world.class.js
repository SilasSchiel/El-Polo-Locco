class World {

    level = level1;
    character = new Character('move-left', 'move-right', 'jump');
    collectCoin = new Audio('./audio/collect-coin.mp3');
    collectBottle = new Audio('./audio/collect-bottle.mp3');
    smashBottle = new Audio('./audio/glass-smash.mp3');
    damageCharacter = new Audio('./audio/character-hurt.mp3');
    damageChicken = new Audio('./audio/enemies-hurt.mp3');
    damageEndboss = new Audio('./audio/endboss-hurt.mp3');
    endbossMusic = new Audio('./audio/endboss-sound.mp3');

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusbarHealth();
    statusBarCoins = new StatusbarCoins();
    statusBarBottles = new StatusbarBottles();
    statusBarEndbossHealth = new StatusbarEndbossHealth();

    throwableObjects = [];
    coinCounter = 0;
    bottleCounter = 0;


    constructor(canvas, keyboard, bottle) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.character.initializeCharacter();
        this.assignedEndbossToLevel();
        this.assignedSmallEnemiesToLevel();
        this.assignedNormalEnemiesToLevel();
        this.run();
        setStoppableInterval(this.checkCollisionsOfElements.bind(this), 1000 / 25);
        setStoppableInterval(this.checkCollisionsOfThrowableElements.bind(this), 200);
        this.mobileThrowObjects(bottle);
    }

    /**
     * 
     * Allows access to the final boss.
     */
    assignedEndbossToLevel() {
        this.level.endboss.forEach(eb => {
            eb.world = this;
            eb.initializeEndboss();
        });
    }

    /**
     * 
     * Allows access to the small chicken.
     */
    assignedSmallEnemiesToLevel() {
        this.level.smallEnemies.forEach(en => {
            en.world = this;
            en.initializeSmallChicken();
        })
    }

    /**
     * 
     * Allows access to the normal chicken.
     */
    assignedNormalEnemiesToLevel() {
        this.level.normalEnemies.forEach(en => {
            en.world = this;
            en.initializeNormalChicken();
        })
    }

    /**
     * 
     * Allows acess to the charcter.
     */
    setWorld() {
        this.character.world = this;
    } 

    /**
     * 
     * Check things that important for Collision
     */
    run() {
        this.checkCollisionsOfElements();
        this.checkCollisionsOfThrowableElements();
    }

    /**
     * 
     * Check collisions width Elements.
     */
    checkCollisionsOfElements() {
        this.checkCollision();
        this.checkCollisionCoins();
        this.checkCollisionBottles();
        this.checkPositionCharacter();
    }

    /**
     * 
     * Check collisions width throwable elements-
     */
    checkCollisionsOfThrowableElements() {
        this.checkThrowObjects();
    }

    /**
     * 
     * check throw objects
     */
    checkThrowObjects() {
        if(this.ifPushKeyboardD()) {
            if(this.ifBottleCounterBiggerThanZero()) {
                let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 150);
                this.addNewThrowableObjects(bottle);
                this.reducedBottleCounter();
                this.character.collectBottle(); 
                this.checkCollisionBottlesOnEnemy(bottle);
           }
        }
    }

    /**
     * 
     * @returns - if pressed key d 
     */
    ifPushKeyboardD() {
        return this.keyboard.D
    }

    /**
     * 
     * @returns - if bottle counter bigger than zero
     */
    ifBottleCounterBiggerThanZero() {
        return this.bottleCounter > 0
    }

    /**
     * 
     * @param {ThrowableObject} bottle - Create a new Bottle
     */
    addNewThrowableObjects(bottle) {
        this.throwableObjects.push(bottle);
    }

    /**
     * 
     * Reduce the bottle Counter
     */
    reducedBottleCounter() {
        this.bottleCounter--;
    }

    /**
     * 
     * 
     */
    characterThrow() {
        if(this.ifBottleCounterBiggerThanZero()) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 150);
            this.throwableObjects.push(bottle);
            this.reducedBottleCounter();
            this.character.collectBottle(); 
            this.checkCollisionBottlesOnEnemy(bottle);
        }
    }

    /**
     * 
     * @param {ThrowableObject} bottle - Create a new bottle.
     */
    checkCollisionBottlesOnEnemy(bottle) {
        setInterval(() => {
            this.checkCollisionBottlesOnSmallEnemies(bottle);
            this.checkCollisionBottlesOnNormalEnemies(bottle);
            this.checkCollsionBottlesOnEndboss(bottle);
         }, 200);
    }

    /**
     * 
     * @param {ThrowableObject} bottle - Create a new Bottle.
     * Check a collision with a bottle and the small enemy
     */
    checkCollisionBottlesOnSmallEnemies(bottle) {
        for(let i = 0; i < this.level.smallEnemies.length; i++) {
            let enemy = this.level.smallEnemies[i];
            this.ifBottleIsCollidingSmallEnemies(enemy, bottle);
        }
    }

    /**
     * 
     * @param {Array} enemy - The little enemy that is tested with the collision of the bottle.
     * @param {ThrowableObject} bottle - Create a new Bottle.
     */
    ifBottleIsCollidingSmallEnemies(enemy, bottle) {
        if(enemy.isAlive) {
            if(bottle.isColliding(enemy)) {
                enemy.markAsDead();
                bottle.splash();
                this.checkSmashBottleSound();
            }
        }
    }

    /**
     * 
     * @param {ThrowableObject} bottle - Create a new bottle.
     * Check a collision with a bottle and the normal enemy.
     */
    checkCollisionBottlesOnNormalEnemies(bottle) {
        for(let i = 0; i < this.level.normalEnemies.length; i++) {
            let enemy = this.level.normalEnemies[i];
            this.ifBottleIsCollidingNormalEnemies(enemy, bottle);
        }
    }

    /**
     * 
     * @param {Array} enemy - The normal enemy that is tested with the collision of the bottle.
     * @param {ThrowableObject} bottle - Create a new bottle.
     */
    ifBottleIsCollidingNormalEnemies(enemy, bottle) {
        if(enemy.isAlive) {
            if(bottle.isColliding(enemy)) {
                enemy.markAsDead();
                bottle.splash();
                this.checkSmashBottleSound();
            }
        }
    }

    /**
     * 
     * @param {string} bottle - Create a new Bottle
     * Check a collision with a bottle and the endboss.
     */
    checkCollsionBottlesOnEndboss(bottle) {
        this.level.endboss.forEach((eb) => {
            if(bottle.isColliding(eb)) {
                bottle.splash(); 
                this.checkSmashBottleSound();
                this.checkDamageEndbossSound();
                eb.characterHitEndboss(eb);
            }
        });
    }

    /**
     * 
     * Check bottle sound.
     */
    checkSmashBottleSound() {
        if(smashBottleSound) {
            this.smashBottle.play();
        } else {
            this.smashBottle.pause();
        }
    }

    /**
     * 
     * Check damage sound for endboss.
     */
    checkDamageEndbossSound() {
        if(damageEndbossSound) {
            this.damageEndboss.play();
        } else {
            this.damageEndboss.pause();
        }
    }

    /**
     * 
     * Check Collision character width Enemey
     */
    checkCollision() {
        this.checkCollisionWidthSmallEnemy();
        this.checkCollisionWidthNormalChicken();
        this.checkCollisionWidthEndboss();
    }

    /**
     * 
     * Check Collision character width small chicken.
     */
    checkCollisionWidthSmallEnemy() {
        for(let i = 0; i < this.level.smallEnemies.length; i++) {
            let enemy = this.level.smallEnemies[i];
            this.ifCharacterIsCollidingWidthSmallEnergy(enemy);
        }
    }

    /**
     * 
     * @param {Array} enemy - The small enemy that is tested width collision of the character.
     */
    ifCharacterIsCollidingWidthSmallEnergy(enemy) {
        if(enemy.isAlive) {
            if(this.character.isColliding(enemy)) {
                if(this.character.isAboveGround() && this.character.speedY < 0)  {
                    enemy.markAsDead();
                    this.character.rebounceJump();
                } else {  
                    this.character.hit();
                }
            } 
        }
    }

    /**
     * 
     * Check collision character width normal chicken.
     */
    checkCollisionWidthNormalChicken() {
        for(let i = 0; i < this.level.normalEnemies.length; i++) {
            let enemy = this.level.normalEnemies[i];
            this.ifCharacterIsCollidingWidthNormalEnergy(enemy);
        }
    }

    /**
     * 
     * @param {Array} enemy - The normal enemy that is tested width collision of the character.
     */
    ifCharacterIsCollidingWidthNormalEnergy(enemy) {
        if(enemy.isAlive) {
            if(this.character.isColliding(enemy)) {
                if(this.character.isAboveGround() && this.character.speedY < 0)  {
                    enemy.markAsDead();
                    this.character.rebounceJump();
                } else {  
                    this.character.hit();
                }
            } 
        }
    }

    /**
     * 
     * Check collision character width endboss.
     */
    checkCollisionWidthEndboss() {
        this.level.endboss.forEach((eb) => {
            if(this.character.isColliding(eb)) {
                this.character.hitEndboss();
                eb.lastAttack = new Date().getTime();
                eb.lastAttackEndboss(); 
            } 
        });
    }

    /**
     * 
     * Check collision width coins.
     */
    checkCollisionCoins() {
        for(let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];
            if(this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.coinCounter++;
                this.character.collectCoin();
                this.checkCollectCoinSound();
            }
        }
    }

    /**
     * 
     * Check Sound for collect coins.
     */
    checkCollectCoinSound() {
        if(collectCoinSound) {
            this.collectCoin.play();
        } else {
            this.collectCoin.pause();
        }
    }

    /**
     * 
     * Check collision width bottles.
     */
    checkCollisionBottles() {
        for(let i = 0; i < this.level.bottles.length; i++) {
            let bottles = this.level.bottles[i];
            if(this.character.isColliding(bottles)) {
                this.level.bottles.splice(i, 1);
                this.draw();
                this.bottleCounter++;
                this.character.collectBottle();
                this.checkCollectBottleSound();
            }
        }
    }

    /**
     * 
     * Check Sound for collect bottle.
     */
    checkCollectBottleSound() {
        if(collectBottleSound) {
            this.collectBottle.play();
        } else {
            this.collectBottle.pause();
        }
    }

    /**
     * 
     * Check current position for character.
     */
    checkPositionCharacter() {
        this.level.endboss.forEach((eb) => {
            this.changeDirectionEndboss(eb);
            this.characterHasContactWidthEndboss(eb);
        });
    }

    /**
     * 
     * @param {Array} eb - Access the enboss.
     * Change the direction of endboss if the character is behind the endboss.
     */
    changeDirectionEndboss(eb) {
        if(eb.x < this.character.x) {
            eb.otherDirection = true;
        } else {
            eb.otherDirection = false;
        }
    }

    /**
     * 
     * @param {Array} eb - Acess the endbooss.
     * If the character is in the near of endboss.
     */
    characterHasContactWidthEndboss(eb) {
        if(this.character.x > 1500) {
            eb.contactWidthEndboss = true;
            this.checkSoundEnbossMusic();
        }
    }

    /**
     * 
     * Check Endboss Music.
     */
    checkSoundEnbossMusic() {
        if(endbossMusicSound) {
            this.endbossMusic.play();
        } else {
            this.endbossMusic.pause();
        }    
    }

    /**
     * 
     * @param {string} bottle - Create a new Bottle
     * Character throw a bottle (Mobile Version)    
    */
    mobileThrowObjects(bottle) {
        document.getElementById(bottle).addEventListener('touchstart', () => {
            if(mobileGameBreak) {
                this.characterThrow();
            }
        });
    }


    /**
     * 
     * Draw the world.
     */
    draw() {   
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndbossHealth);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.normalEnemies);
        this.addObjectsToMap(this.level.endboss);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen.
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * 
     * @param {string} obj - The object (Array) that add to the map.
     */
    addObjectsToMap(obj) {
        obj.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * 
     * @param {string} mo - The object that add to the map.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.draw(this.ctx);
 
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}