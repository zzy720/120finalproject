class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        //load sfx and bgm
        this.load.audio('button', './assets/button.wav');
        this.load.audio('bgm', './assets/bgm.wav');
    }

    create() {
        //create bgm and play
        this.background = this.sound.add('bgm', {
            volume: 0.3,
            loop: true,
        });

        //this.background.play(); //play bgm

        //add texts
        this.title = this.add.text(320, 240, 'THE FUNERAL', scoreConfig).setOrigin(0.5, 0.5);
        this.continue = this.add.text(320, 300, 'Press Space to start', scoreConfig).setOrigin(0.5, 0.5);

        //user interaction to continue to the game
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //go to game scene when press space
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('button'); //play sfx
            this.scene.start('funeralScene');
        }

    }
}