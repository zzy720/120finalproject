class Funeral extends Phaser.Scene{
    constructor() {
        super("funeralScene");
    }

    preload() {
        this.load.image('tony', './assets/character placementtt.png');
    }

    create() {
        console.log('hello');
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.main = new Tony(this, 100, 480, 'tony', 0).setOrigin(0, 1);
        this.physics.add.existing(this.main);
        this.main.body.setCollideWorldBounds(true);
        this.main.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', () => {
            isJump = false;
        });
        
    }

    update() {
        this.main.update();

    }
}