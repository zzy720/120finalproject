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
        this.load.image('rip', './assets/Grave.png');
        this.load.spritesheet('group', './assets/group.png', {
            frameWidth: 222,
            frameHeight:131
        });
        this.load.spritesheet('rain', './assets/Rain_Animation.png', {
            frameWidth: 1500,
            frameHeight: 480
        });
        this.load.spritesheet('title', './assets/titlel.png', {
            frameWidth: 1103,
            frameHeight: 333,
        })
    }

    create() {
        //create bgm and play
        this.background = this.sound.add('bgm', {
            volume: 0.3,
            loop: true,
        });

        this.anims.create({
            key: 'groupidle',
            frames: this.anims.generateFrameNumbers('group'),
            frameRate: 1
        });
        this.anims.create({
            key: 'raindrop',
            frames: this.anims.generateFrameNumbers('rain'),
            frameRate: 20
        });
        this.anims.create({
            key: 'titleanim',
            frames: this.anims.generateFrameNumbers('title'),
            frameRate: 3
        })

        //this.background.play(); //play bgm

        //background layer
        this.background = this.add.sprite(0, 0, 'FuneralBack').setOrigin(0, 0);
        this.rain = this.add.sprite(0, 0, 'rain').setOrigin(0, 0); //rain animation layer
        this.group = this.add.sprite(1183, 338, 'group').setOrigin(0, 0);
        this.tomb = this.add.sprite(1400, 419, 'rip');
        this.rain2 = this.add.sprite(0, 0, 'rain').setOrigin(0, 0); //rain animation layer
        this.physics.world.setBounds(0, 0, 1500, game.config.height);

        //add texts
        this.titletest = this.add.sprite(360, 242, 'title');
        this.titletest.setScale(0.5);

        //camera follow
        this.holder = this.physics.add.sprite(0, 0, 'holder').setOrigin(0, 0);
        this.holder.body.setCollideWorldBounds(true); //do not go out of the world
        this.holder.alpha = 0;


        //camera setting
        this.cameras.main.setBounds(0, 0, 1500, game.config.height); //world bound
        this.cameras.main.startFollow(this.holder, false, 1, 1, -320, 0); //follow the main character

        //user interaction to continue to the game
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.time.addEvent({
            callback: () => {
                if(this.holder.x < 860){
                    this.holder.setVelocityX(80);
                } else {
                    this.holder.setVelocityX(0);
                }
            },
            delay: 500
        });
    }

    update() {
        this.group.anims.play('groupidle', true);
        this.rain.anims.play('raindrop', true);
        this.rain2.anims.play('raindrop', true);
        this.titletest.anims.play('titleanim', true);

        this.titletest.setPosition(this.holder.x + 328, this.holder.y + 245);
        
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