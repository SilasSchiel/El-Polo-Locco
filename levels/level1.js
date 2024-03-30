const level1 = new Level(
    [
        new BackgroundObject('./img/5_background/layers/air.png', -719, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719, 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719, 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719, 0),

        new BackgroundObject('./img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('./img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719, 0),
        
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 2, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3, 0)
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ],
    [
        new NormalChicken(),
        new NormalChicken(),
        new NormalChicken(),
        new NormalChicken(),
        new NormalChicken(),
        new NormalChicken(),
        new NormalChicken(),
        new NormalChicken()
    ],
    [
        new Endboss()
    ],
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins() 
    ],
    [
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles()
    ]
)