class Level {
    backgroundObjects;
    clouds;
    smallEnemies;
    nomalEnemies;
    endboss;
    coins;
    bottles;
    levelEnd_x = 2157;

    constructor(backgroundObjects, clouds, smallEnemies, normalEnemies, endboss, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.smallEnemies = smallEnemies; 
        this.normalEnemies = normalEnemies;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}
