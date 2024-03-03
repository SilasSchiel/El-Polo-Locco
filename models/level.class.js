class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    coins;
    bottles;
    levelEnd_x = 2157;

    constructor(backgroundObjects, clouds, enemies, endboss, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies; 
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}
