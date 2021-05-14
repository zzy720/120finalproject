class Puzzle extends Phaser.Scene{
    constructor() {
        super("puzzleScene");
    }

    preload() {

    }

    create() {
        //this.add.text(400,230, "puzzle", scoreConfig);

        //player input definition
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //main character
        this.main = new Tony(this, 100, 480, 'tony_walk', 0).setOrigin(0, 0);
        this.physics.add.existing(this.main);
        this.main.body.setCollideWorldBounds(true);
        this.main.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', () => {
            isJump = false;
        });

        //camera setting
        this.cameras.main.setBounds(0, 0, 5000, game.config.height);
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155);
        
    }

    update() {
        this.main.update();
    }
}