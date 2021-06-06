class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        //load sfx and bgm
        this.load.audio('button', './assets/button.wav');
        this.load.audio('bgm', './assets/bgm.wav');
        this.load.image('FuneralBack', './assets/Funeral.png');
        this.load.image('holder', './assets/blank.png');
    }

    create() {
        //create bgm and play
        this.background = this.sound.add('bgm', {
            volume: 0.3,
            loop: true,
        });

        //this.background.play(); //play bgm

        //background layer
        this.background = this.add.sprite(0, 0, 'FuneralBack').setOrigin(0, 0);
        this.physics.world.setBounds(0, 0, 1500, game.config.height);

        //add texts
        this.title = this.add.text(320, 240, 'THE FUNERAL', scoreConfig).setOrigin(0.5, 0.5);
        this.continue = this.add.text(320, 300, 'Press Space to start', scoreConfig).setOrigin(0.5, 0.5);

        //camera follow
        this.holder = this.physics.add.sprite(0, 0, 'holder').setOrigin(0, 0);
        this.holder.body.setCollideWorldBounds(true); //do not go out of the world
        this.holder.alpha = 0;


        //camera setting
        this.cameras.main.setBounds(0, 0, 1500, game.config.height); //world bound
        this.cameras.main.startFollow(this.holder, false, 1, 1, 320, 0); //follow the main character

        //user interaction to continue to the game
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.time.addEvent({
            callback: () => {
                let direction = this.getRandomInt(0, 1);
                if(direction == 0){
                    this.holder.setVelocityX(150);
                } else if(direction == 1) {
                    this.holder.setVelocityx(-150);
                }
                
            },
            repeat: -1,
            delay: 5000
        });
    }

    update() {

        this.title.setPosition(this.cameras.main.x, this.cameras.main.y);
        //go to game scene when press space
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('button'); //play sfx
            this.scene.start('funeralScene');
        }

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }
}