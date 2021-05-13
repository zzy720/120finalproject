class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {
        //add texts
        this.title = this.add.text(320, 240, 'GAME', scoreConfig).setOrigin(0.5, 0.5);
        this.continue = this.add.text(320, 300, 'Press Space to start', scoreConfig).setOrigin(0.5, 0.5);

        //user interaction to continue to the game

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('funeralScene');
        }

    }
}