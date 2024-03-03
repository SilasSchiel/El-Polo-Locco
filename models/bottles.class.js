class Bottles extends MoveableObject {
    y = 330;
    width = 80;
    height = 100;
    
    constructor() {
        super().loadImg('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    
        this.x = 200 + Math.random() * 2000;

    }  
}

