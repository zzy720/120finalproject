class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload() {
        //load sfx and bgm
        this.load.audio('button', './assets/button.wav');
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
        this.load.audio('funeral_background', './assets/120final_funeral.wav');
        this.load.audio('menu_background', './assets/120final_menu.wav');
        this.load.audio('puzzle1bgm', './assets/120final_puzzle1.wav');
        this.load.audio('puzzle2bgm', './assets/120final_puzzle2.wav');
        this.load.audio('finalplotbgm', './assets/120final_finalplot.wav');

        //add a loading screen 
        //source from https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(150, 210, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px pixel',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(160, 220, 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
    }

    create() {
        
        this.bgm = this.sound.add('menu_background', {
            volume: 0.1,
            loop: true
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
            frameRate: 4
        })


        //play background musics
        this.bgm.play();

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
        this.title = this.add.text(320, 240, 'THE FUNERAL', scoreConfig).setOrigin(0.5, 0.5);
        this.title.alpha = 0;
        this.continue = this.add.text(320, 300, 'Press Space to start', scoreConfig).setOrigin(0.5, 0.5);
        this.continue.alpha = 0;

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
        //this.title.setPosition(this.holder.x + 320, this.holder.y + 240);
        //this.continue.setPosition(this.title.x, this.title.y + 60);
        //go to game scene when press space
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.bgm.stop(); //stop background music
            this.sound.play('button'); //play sfx
            this.scene.start('funeralScene');
        }

    }
}