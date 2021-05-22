class Puzzle2 extends Phaser.Scene {
    constructor() {
        super('puzzle2Scene');
    }

    preload() {
        this.load.image('trans', './assets/transparent.png');
        this.load.image('test', './assets/map.png');
        this.load.image('mask', './assets/mask1.png');
    }

    create() {
        const pic = this.add.image(0, 0, 'trans').setOrigin(0, 0);

        const spotlight = this.make.sprite({
            x: 100,
            y: 100,
            key: 'mask',
            add: false
        });

        console.log(spotlight);
        
        pic.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);

        this.input.on('pointermove', function (pointer) {

            spotlight.x = pointer.x;
            spotlight.y = pointer.y;

        });

    }

    update() {

        
    }
}