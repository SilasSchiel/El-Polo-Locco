class World {

    level = level1;
    character = new Character();

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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    } 

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkCollisionCoins();
            this.checkCollisionBottles()
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if(this.keyboard.D) {
            if(this.bottleCounter > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.bottleCounter--;
                this.character.collectBottle(); 
                this.checkCollisionBottlesOnEnemy(bottle);
0            }
        }
    }

    checkCollisionBottlesOnEnemy(bottle) {
        setInterval(() => {
            for(let i = 0; i < this.level.enemies.length; i++) {
                let enemy = this.level.enemies[i];

                if(bottle.isColliding(enemy)) {
                    enemy.markAsDead();
                    bottle.splash();
                    setTimeout(() => {
                        this.level.enemies.splice(i, 1);
                    }, 1000);
                }
            }

            this.level.endboss.forEach((eb) => {
                if(bottle.isColliding(eb)) {
                    this.character.energyEndboss -= 2;
                    this.character.updateEndbossHealth();
                    // Animationen für Collsionen (Endboss)!!
                    // Endboss is Hurt
                }
            });

         }, 200);
    }

    checkCollision() {
        for(let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            if(this.character.isColliding(enemy)) {
                this.character.hit();
            } 
        }

        this.level.endboss.forEach((eb) => {
            if(this.character.isColliding(eb)) {
                this.character.hitEndboss();
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
            }
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
            }
        }
    }

    isCharacterDead() {
        if(this.character.energy <= 0) {
            setInterval(() => {
                this.world.playAnimation(this.character.IMAGES_DEAD);
            }, 1000 / 60);
        }
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
        this.addObjectsToMap(this.level.enemies);
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
        mo.drawBorder(this.ctx);
        mo.drawBorderOffset(this.ctx);
 
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}