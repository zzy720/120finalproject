class Puzzle2 extends Phaser.Scene {
    constructor() {
        super('puzzle2Scene');
    }

    preload() {
        this.load.tilemapTiledJSON('map2', 'assets/tilemaps/tilemap2.json')
        this.load.image('tiles3', 'assets/tilemaps/tileset3new.png');  //1024*1024
        this.load.image('grave', './assets/tilemaps/grave.png');
        this.load.image('flower', './assets/tilemaps/flower2.png');
        this.load.image('pillar', './assets/tilemaps/heaven.png');
        this.load.image('sky', './assets/tilemaps/sky.png');
        this.load.image('box', './assets/images/box.png');
        this.load.image('controller3-left', './assets/images/controler3.png');
        this.load.image('controller3-right', './assets/images/controler3-1.png');
        this.load.image('yellow_floor-close', './assets/images/door4.png');
        this.load.image('yellow_floor-open', './assets/images/door4-0.png');
        this.load.image('yellow_door-close', './assets/images/door3.png');
        this.load.image('yellow_door-open', './assets/images/door3-0.png');
        this.load.spritesheet('idleshadow', './assets/ghostright_idle.png', {
            frameWidth: 64,
            frameHeight: 105
        });
        this.load.spritesheet('mom', './assets/Mom.png', {
            frameWidth: 32,
            frameHeight: 73
        });
        this.load.spritesheet('shadowfly2', './assets/flypuzzle2.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('transform', './assets/transform.png', {
            frameWidth: 64,
            frameHeight: 105
        });

        //load audio
        this.load.audio('running2', './assets/running2.wav');
    }

    create() {
        //create sound & bgm
        this.puzzle2bgm = this.sound.add('puzzle2bgm', {
            volume: 0.01,
            loop: true
        });
        this.lastplot = this.sound.add('finalplotbgm', {
            volume: 0.1,
            loop: false
        })
        this.stepbutton = this.sound.add('floordooropen', { //sound played when stepon button and open trapdoor
            volume: 0.6
        });
        this.opendoor = this.sound.add('dooropen', { //sound played when turn lever and open door
            volume: 0.3
        })
        this.running = this.sound.add('running2', { //running sound
            volume: 0.3,
            loop: true
        })
        this.hitspike = this.sound.add('hitspike', { //sound effect when hit spike
            volume: 0.7
        })

        isRight = true; //intially facing right
        this.dialogorder = 0;
        
        //controller count initialize
        this.control_yellow = 1;

        this.anims.create({
            key: 'flyshadow2',
            frames: this.anims.generateFrameNumbers('shadowfly2'),
            frameRate: 8
        })
        this.anims.create({
            key: 'trans',
            frames: this.anims.generateFrameNumbers('transform'),
            frameRate: 3
        })
        this.anims.create({
            key: 'gidle',
            frames: this.anims.generateFrameNumbers('idleshadow'),
            frameRate: 3
        })
        this.anims.create({
            key: 'momidle',
            frames: this.anims.generateFrameNumbers('mom'),
            frameRate: 2
        })

        this.map = this.add.tilemap('map2'); 
        let tiles3 = this.map.addTilesetImage('tileset3new','tiles3');  // set tileset name
        let sky = this.map.addTilesetImage('sky','sky');  // set tileset name
        let flower = this.map.addTilesetImage('flower2','flower');  // set tileset name
        let pillar = this.map.addTilesetImage('heaven','pillar');  // set tileset name
        let grave = this.map.addTilesetImage('grave', 'grave');
        let bglayer = this.map.createLayer('background',[sky]);  // set layer name
        let decolayer = this.map.createLayer('decorations',[flower, pillar, grave]);  // set layer name
        let layer = this.map.createLayer('ground',[tiles3]);  // set layer name
        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(-100, 0, 1300, 1000);

        //player input definition
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //create spikes
        this.spikegroup = this.physics.add.staticGroup({ //group for spike obstacle
            collideWorldBounds: true
        });
        this.floordoor = this.physics.add.staticGroup({
            collideWorldBounds: true
        });

        this.spike1 = this.spikegroup.create(220, 855, 'spikes');
        this.spike1.setScale(1.2);
        this.spike2 = this.spikegroup.create(300, 663, 'spikes');
        this.spike2.setScale(1.2);
        //this.spike3 = this.spikegroup.create(481, 520, 'spikes');
        //this.spike3.angle = 180;
        //this.spike3.setScale(1.1);
        this.spike4 = this.spikegroup.create(300, 985, 'spikes');
        this.spike5 = this.spikegroup.create(410, 472, 'spikes');
        this.spike5.setScale(1.2);
        this.spike6 = this.spikegroup.create(500, 278, 'spikes');
        this.spike6.setScale(1.4);
        this.spike7 = this.spikegroup.create(540, 278, 'spikes');
        this.spike7.setScale(1.4);
        this.spike8 = this.spikegroup.create(460, 278, 'spikes');
        this.spike8.setScale(1.4);

        this.floordoor1 = this.floordoor.create(511, 880, 'floor_door');
        this.floordoor2 = this.floordoor.create(128, 304, 'floor_door');
        this.floordoor3 = this.floordoor.create(720, 689, 'yellow_floor-close');
        this.yellowdoor = this.physics.add.staticSprite(970, 255, 'yellow_door-open');

        this.button1 = this.physics.add.staticSprite(695, 985, 'button-up');
        this.button1.body.setSize(32,7);
        this.button1_sub = this.physics.add.staticSprite(695, 980, 'button-up');
        this.button1_sub.alpha = 0;
        this.button1_sub.body.setSize(15, 3);
        this.physics.add.collider(this.button1, this.button1_sub);

        this.box1 = this.physics.add.sprite(771, 870, 'box');
        this.physics.add.collider(layer, this.box1);
        let isplayed1 = false;
        this.physics.add.overlap(this.button1_sub, this.box1, () => {
            if(!isplayed1) {
                this.stepbutton.play();
                isplayed1 = true;
            }
            this.button1.setTexture('button-down');
            this.floordoor1.setTexture('floor_door_open');
            this.floordoor1.setActive(false);
            this.floordoor1.body.enable = false;
        });

        this.physics.add.collider(this.box1, this.button1);

        this.button2 = this.physics.add.staticSprite(800, 792, 'button-up');
        this.button2.body.setSize(32, 7); 
        this.button2_sub = this.physics.add.staticSprite(800, 787, 'button-up');
        this.button2_sub.alpha = 0;
        this.button2_sub.body.setSize(15, 3);
        this.physics.add.collider(this.button2, this.button2sub);

        this.box2 = this.physics.add.sprite(820, 320, 'box');
        this.physics.add.collider(layer, this.box2);
        let isplayed2 = false;
        this.physics.add.overlap(this.button2_sub, this.box2, () => {
            if(!isplayed2) {
                this.stepbutton.play();
                isplayed2 = true;
            }
            this.button2.setTexture('button-down');
            this.floordoor2.setTexture('floor_door_open');
            this.floordoor2.setActive(false);
            this.floordoor2.body.enable = false;
        });
        this.physics.add.collider(this.box2, this.button2);


        this.controller3 = this.physics.add.staticSprite(570, 658, 'controller3-left');
        this.controller3_sub = this.physics.add.staticSprite(570, 658, 'controller3-left');
        this.controller3_sub.body.setSize(64,32);
        this.controller3_sub.alpha = 0;
        

        //create main character
        this.main = new Tony(this, 60, 890, 'idle_right', 0, 125).setOrigin(0, 0);
        //this.main = new Tony(this, 400, 10, 'idle_right', 0, 125).setOrigin(0, 0);
        this.physics.add.existing(this.main);
        this.main.setScale(0.7);
        this.main.body.setSize(43, 85); 
        this.main.body.setCollideWorldBounds(true);
        this.main.body.onWorldBounds = true;

        //shadow
        this.shadow = this.add.sprite(47, 679, 'shadowfly2').setOrigin(0, 0); //initial shadow
        this.shadow.setScale(0.7);
        this.isPlay = false;
        this.isEnd = false; //does the player reach the end?

        this.shadow_final = this.physics.add.sprite(20, 55, 'idleshadow').setOrigin(0, 1); //shadow at the final position
        this.shadow_final.setScale(0.8);
        this.physics.add.collider(this.shadow_final, layer);
        this.shadow_final.body.setSize(180, 102);

        //mom
        this.mom = this.add.sprite(this.shadow_final.x + 13, this.shadow_final.y + 16, 'mom').setOrigin(0, 0);
        this.mom.setScale(0.8);
        this.mom.flipX = true;
        this.mom.setVisible(false);
        this.istalking = false; //is player talking to mom?
        this.hastalkedmom = false;//has player finished talking with mom?

        this.physics.add.overlap(this.shadow_final, this.main, () => {
            this.isPlay = false;
            this.isEnd = true;
            this.cameras.main.zoomTo(2, 1000);
            this.puzzle2bgm.stop();
            this.running.stop();
            this.lastplot.play();
            this.shadow_final.anims.play('trans', true);
            this.shadow_final.on('animationcomplete', () => {
                this.shadow_final.destroy();
                this.isPlay = true;
                this.mom.setVisible(true);
                this.mom.anims.play('momidle', true);
                this.time.delayedCall(1000, () => {
                    this.istalking = true;
                });
            });
        });

        //dialogue box config
        this.back = this.add.sprite(0, 160, 'dialog').setOrigin(0, 0);
        this.back.setScale(0.5);
        this.dialogue = this.add.text(this.back.x + 20, this.back.y + 15, 'null', finalConfig).setOrigin(0, 0);
        this.space = this.add.text(this.dialogue.x, this.dialogue.y + 40, "Press S to continue", finalConfig);

        //set to invisible when not activated
        this.back.setActive(false).setVisible(false);
        this.dialogue.setActive(false).setVisible(false);
        this.space.setActive(false).setVisible(false);

        //jump mechanics 
        this.physics.world.on('worldbounds', () => {
                isJump = false;
        });
    
        this.physics.add.collider(this.main, layer, ()=> {
            isJump = false;
        });

        this.physics.add.collider(this.box1, this.main);
        this.physics.add.collider(this.box2, this.main);

        this.isspikeSound = false;
        this.physics.add.collider(this.main, this.spikegroup, () => {
            if(!this.isspikeSound) {
                this.hitspike.play();
                this.isspikeSound = true;
            }
            this.reset();
        });

        this.physics.add.collider(this.main, this.floordoor);
        this.physics.add.collider(this.button1, this.main, () => {
            isJump = false;
        });
        this.physics.add.collider(this.button2, this.main, () => {
            isJump = false;
        });

        this.physics.add.collider(this.controller3, this.main);
        this.physics.add.collider(this.yellowdoor, this.main);

        this.physics.add.overlap(this.controller3_sub, this.main, () => {
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.opendoor.play();
                if(this.control_yellow % 2 == 0){
                    this.controller3.setTexture('controller3-left');
                    this.yellowdoor.setTexture('yellow_door-open');
                    this.floordoor3.setTexture('yellow_floor-close');
                    this.yellowdoor.body.enable = false;
                    this.floordoor3.body.enable = true;
                } else {
                    this.controller3.setTexture('controller3-right');
                    this.yellowdoor.setTexture('yellow_door-close');
                    this.floordoor3.setTexture('yellow_floor-open');
                    this.yellowdoor.body.enable = true;
                    this.floordoor3.body.enable = false;
                }
                this.control_yellow += 1;
            }
        })
        //camera setting
        this.cameras.main.setBounds(0, 0, 1024, 1024);
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155);

        //play initial animation
        this.time.delayedCall(2000, () => {
            let question = this.add.sprite(this.main.x + 55, this.main.y, 'question'); //?
            question.anims.play('what');
            question.on('animationcomplete', () => {
                question.destroy();
                this.shadow.anims.play('flyshadow2',true);
                this.shadow.on('animationcomplete', () => {
                    this.time.delayedCall(2000, () => {
                        this.shadow.destroy();
                        this.isPlay = true;
                    });
                });
            });
        });

        this.puzzle2bgm.play();

        //create footstep
        this.input.keyboard.on('keydown-A', () => {
            this.running.play();
        });
        this.input.keyboard.on('keyup-A', () => {
            this.running.stop();
        });
        this.input.keyboard.on('keydown-D', () => {
            this.running.play();
        });
        this.input.keyboard.on('keyup-D', () => {
            this.running.stop();
        });
    }

    update() {
        this.main.update();
        this.box1.setVelocityX(0);
        this.box2.setVelocityX(0);
        
        if(!this.isPlay) {
            this.input.keyboard.enabled = false;
        }

        if(this.isPlay) {
            this.input.keyboard.enabled = true;
        }

        if(!this.isEnd) {
            this.shadow_final.anims.play('gidle', true);
        }

        if(this.isEnd) {
            this.main.body.setVelocity(0);
        }

        if(this.istalking) {
            this.momtalk();
            if(this.hastalkedmom){
                this.time.delayedCall(1000, () => {
                    let shine = this.add.sprite(0, 0, 'glow').setOrigin(0, 0);
                    shine.flipX = true;
                    shine.flipY = true;
                    shine.anims.play('shine');
                    shine.on('animationcomplete', () => {
                        this.scene.start('exitScene');
                    });
                });
            }
        }

        if(this.main.x < 0){
            this.main.setPosition(1000, this.main.y);
        }
        if(this.main.x > 1024) {
            this.main.setPosition(0, this.main.y);
        }

        if(this.box1.x < 0){
            this.box1.setPosition(990, this.box1.y);
        }
        if(this.box1.x > 1024) {
            this.box1.setPosition(0, this.box1.y); 
        }
        if(this.box2.x < 0){
            this.box2.setPosition(990, this.box2.y);
        }
        if(this.box2.x > 1024) {
            this.box2.setPosition(0, this.box2.y); 
        }


        //play animation
        if(!isStop && !isJump) {
            if(isRight) {
                this.main.anims.play('rightrun', true);
            }
            if(isLeft) {
                this.main.anims.play('leftrun', true);
            }
        } else if(isStop && !isJump) {
            if(isRight) {
                this.main.anims.play('rightidle', true);
            }
            if(isLeft) {
                this.main.anims.play('leftidle', true);
            }
        } else if(isJump){
            isStop = true;
            if(isRight) {
                this.main.anims.play('rightjump', true);
                this.main.on('animationcomplete', () => {
                    isStop = false;
                });
            }
            if(isLeft) {
                this.main.anims.play('leftjump', true);
                this.main.on('animationcomplete', () => {
                    isStop = false;
                });
            }
        }
        
    }

    reset() {
        this.main.setPosition(60, 890);
        this.box1.setPosition(771, 870);
        this.box2.setPosition(820, 320);
        this.isspikeSound = false;
    }

    momtalk() {
        this.back.setActive(true).setVisible(true);
        this.dialogue.setActive(true).setVisible(true);
        this.space.setActive(true).setVisible(true);
        this.dialogue.text = momdialogue[this.dialogorder];
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('button');
            this.dialogorder += 1;
            this.dialogue.text = momdialogue[this.dialogorder];
            if(this.dialogorder > momdialogue.length) {
                this.back.setVisible(false);
                this.dialogue.setVisible(false);
                this.space.setVisible(false);
                this.dialogorder = 0;
                this.istalking = false;
                this.hastalkedmom = true;
            }
        }
    }
}