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

        document.getElementById(bottle).addEventListener('touchstart', () => {
            if(mobileGameBreak) {
                this.characterThrow();
            }
        });
    }

    assignedEndbossToLevel() {
        this.level.endboss.forEach(eb => {
            eb.world = this;

            eb.initializeEndboss();
        });
    }

    assignedSmallEnemiesToLevel() {
        this.level.smallEnemies.forEach(en => {
            en.world = this;

            en.initializeSmallChicken();
        })
    }

    assignedNormalEnemiesToLevel() {
        this.level.normalEnemies.forEach(en => {
            en.world = this;

            en.initializeNormalChicken();
        })
    }

    setWorld() {
        this.character.world = this;
    } 

    run() {
        this.checkCollisionsOfElements();
        this.checkCollisionsOfThrowableElements();
    }

    checkCollisionsOfElements() {
        this.checkCollision();
        this.checkCollisionCoins();
        this.checkCollisionBottles();
        this.checkPositionCharacter();
    }

    checkCollisionsOfThrowableElements() {
        this.checkThrowObjects();
    }

    checkThrowObjects() {
        if(this.keyboard.D) {
            if(this.bottleCounter > 0) {
                let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 150);
                this.throwableObjects.push(bottle);
                this.bottleCounter--;
                this.character.collectBottle(); 
                this.checkCollisionBottlesOnEnemy(bottle);
           }
        }
    }

    characterThrow() {
        if(this.bottleCounter > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 150);
            this.throwableObjects.push(bottle);
            this.bottleCounter--;
            this.character.collectBottle(); 
            this.checkCollisionBottlesOnEnemy(bottle);
        }
    }

    checkCollisionBottlesOnEnemy(bottle) {
        setInterval(() => {
            for(let i = 0; i < this.level.smallEnemies.length; i++) {
                let enemy = this.level.smallEnemies[i];
                
                if(enemy.isAlive) {
                    if(bottle.isColliding(enemy)) {
                        enemy.markAsDead();
                        bottle.splash();
                        this.checkSmashBottleSound();
                    }
                }
            }

            for(let i = 0; i < this.level.normalEnemies.length; i++) {
                let enemy = this.level.normalEnemies[i];
                
                if(enemy.isAlive) {
                    if(bottle.isColliding(enemy)) {
                        enemy.markAsDead();
                        bottle.splash();
                        this.checkSmashBottleSound();
                    }
                }
            }

            this.level.endboss.forEach((eb) => {
                if(bottle.isColliding(eb)) {
                    bottle.splash(); 
                    this.checkSmashBottleSound();
                    this.checkDamageEndbossSound();
                    eb.characterHitEndboss(eb);
                }
            });

         }, 200);
    }

    checkSmashBottleSound() {
        if(smashBottleSound) {
            this.smashBottle.play();
        } else {
            this.smashBottle.pause();
        }
    }

    checkDamageEndbossSound() {
        if(damageEndbossSound) {
            this.damageEndboss.play();
        } else {
            this.damageEndboss.pause();
        }
    }

    checkCollision() {
        for(let i = 0; i < this.level.smallEnemies.length; i++) {
            let enemy = this.level.smallEnemies[i];

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

        for(let i = 0; i < this.level.normalEnemies.length; i++) {
            let enemy = this.level.normalEnemies[i];

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

        this.level.endboss.forEach((eb) => {
            if(this.character.isColliding(eb)) {
                this.character.hitEndboss();
                eb.lastAttack = new Date().getTime();
                eb.lastAttackEndboss(); 
            } 
        });
    }

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

    checkCollectCoinSound() {
        if(collectCoinSound) {
            this.collectCoin.play();
        } else {
            this.collectCoin.pause();
        }
    }

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

    checkCollectBottleSound() {
        if(collectBottleSound) {
            this.collectBottle.play();
        } else {
            this.collectBottle.pause();
        }
    }

    checkPositionCharacter() {
        this.level.endboss.forEach((eb) => {
            if(eb.x < this.character.x) {
                eb.otherDirection = true;
            } else {
                eb.otherDirection = false;
            }

            if(this.character.x > 1500) {
                eb.contactWidthEndboss = true;
                if(endbossMusicSound) {
                    this.endbossMusic.play();
                } else {
                    this.endbossMusic.pause();
                }
                
            }
        });
    }


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

    addObjectsToMap(obj) {
        obj.forEach(o => {
            this.addToMap(o);
        });
    }

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