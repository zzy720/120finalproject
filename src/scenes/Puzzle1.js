class Puzzle1 extends Phaser.Scene{
    constructor() {
        super("puzzle1Scene");
    }

    preload() {
        //load images and spritesheets
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap1.json')
        this.load.image('tiles', 'assets/tilemaps/tilesets1.png');  
        this.load.image('tiles2', 'assets/tilemaps/jungle01.png'); 
        this.load.image('floor_door', './assets/images/door-l.png');
        this.load.image('floor_door_open', './assets/images/door-l0.png');
        this.load.image('spikes', './assets/images/obstacle.png');
        this.load.image('controller1-left', './assets/images/controler1.png');
        this.load.image('controller1-right', './assets/images/controler1-1.png');
        this.load.image('controller2-left', './assets/images/controler2.png');
        this.load.image('controller2-right', './assets/images/controler2-1.png');
        this.load.image('button-up', './assets/images/botton1.png');
        this.load.image('button-down', './assets/images/button.png');
        this.load.spritesheet('run_left', './assets/L_Run.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        this.load.spritesheet('run_right', './assets/R_Run.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        this.load.spritesheet('jump_left', './assets/L_Jump.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        this.load.spritesheet('jump_right', './assets/R_Jump.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        this.load.image('red_door-close', './assets/images/door1.png');
        this.load.image('red_door-open', './assets/images/door1-0.png');
        this.load.image('purple_door-close', './assets/images/door2.png');
        this.load.image('purple_door-open', './assets/images/door2-0.png');
        this.load.image('key', './assets/images/key.png');
        this.load.image('findkey', './assets/key_bubble.png');
        this.load.image('exit', './assets/images/newdoor2.png');
        this.load.image('exit-unlock', './assets/images/newdoor.png');
        this.load.image('exit-open', './assets/images/newdoor1.png');
        this.load.image('black', './assets/black.png');
        this.load.spritesheet('shadowfly1', './assets/flypuzzle1.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('pressSpace', './assets/images/keyspace-Sheet.png', {
            frameWidth: 64,
            frameHeight: 32
        });

        //load audio
        this.load.audio('dooropen', './assets/door_open.wav');
        this.load.audio('floordooropen', './assets/floor_door_open.wav');
        this.load.audio('running1', './assets/running1.wav');
        this.load.audio('hitspike', './assets/spike.wav');
        this.load.audio('getkey', './assets/getkey.wav');
        this.load.audio('bigdooropen', './assets/bigdoor_open.wav');
    }

    create() {
        //create sound & bgm
        this.puzzle1bgm = this.sound.add('puzzle1bgm', {
            volume: 0.03,
            loop: true
        });
        this.stepbutton = this.sound.add('floordooropen', { //sound played when stepon button and open trapdoor
            volume: 0.6
        });
        this.opendoor = this.sound.add('dooropen', { //sound played when turn lever and open door
            volume: 0.3
        })
        this.running = this.sound.add('running1', { //running sound
            volume: 0.4,
            loop: true
        })
        this.hitspike = this.sound.add('hitspike', { //sound effect when hit spike
            volume: 0.7
        })
        this.pickkey = this.sound.add('getkey', { //sound effect when get the key
            volume: 0.6
        })
        this.bigdooropen = this.sound.add('bigdooropen', {
            volume: 0.5
        })

        isRight = true; //intially facing right
        
        //controller control count initialize
        this.control_red = 1;
        this.control_purple = 1;

        //passing the puzzle condition
        this.isPass = false;

        //create animation
        this.anims.create({
            key:'leftrun',
            frames: this.anims.generateFrameNumbers('run_left'),
            frameRate: 7
        });
        this.anims.create({
            key:'rightrun',
            frames: this.anims.generateFrameNumbers('run_right'),
            frameRate: 7
        });
        this.anims.create({
            key:'leftjump',
            frames: this.anims.generateFrameNumbers('jump_left'),
            frameRate: 6
        }); 
        this.anims.create({
            key: 'rightjump',
            frames: this.anims.generateFrameNumbers('jump_right'),
            frameRate: 6
        });
        this.anims.create({
            key: 'flyshadow1',
            frames: this.anims.generateFrameNumbers('shadowfly1'),
            frameRate: 8
        });
        this.anims.create({
            key: 'pressspace',
            frames: this.anims.generateFrameNumbers('pressSpace'),
            frameRate: 10
        });

        //create the map
        this.map = this.add.tilemap('map'); 
        let tiles = this.map.addTilesetImage('tilesets1','tiles');  // set tileset name
        let tiles2 = this.map.addTilesetImage('jungle01','tiles2');
        let backgroundlayer = this.map.createLayer('background',[tiles2]);
                
        //interaction guide
        //this.interact = this.add.text(220, 70, "try to step on it", scoreConfig);
        this.instruction = this.add.sprite(600, 355, 'keyE').setOrigin(0, 0);
        this.instruction.setScale(0.7);
        this.getkey = this.add.sprite(300, 312, 'keyE').setOrigin(0, 0);
        this.getkey.setScale(0.7);
        this.space = this.add.sprite(350, 100, 'keySPACE');
        this.space.setScale(0.7);
        this.space.setVisible(false);
        this.arrowup = this.add.sprite(383, 99, 'arrowUP');
        this.arrowup.setScale(0.4);
        this.arrowup.setVisible(false);
        this.pressspace = this.add.sprite(293, 590, 'pressSpace');
        this.pressspace.setScale(0.5);

????????????????//player??input??definition
????????????????keyA??=??this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
????????????????keyD??=??this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
????????????????keyE??=??this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
????????????????keyS??=??this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
????????????????keySPACE??=??this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyF1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1);

        //create groups for items
        this.spikegroup = this.physics.add.staticGroup({ //group for spike obstacle
            collideWorldBounds: true
        });

        this.buttongroup = this.physics.add.staticGroup({ //group for buttons
            collideWorldBounds: true
        });

        this.controllergroup = this.physics.add.staticGroup({ //group for controller
            collideWorldBounds: true
        });
        this.floor_door_group = this.physics.add.staticGroup({ //group for door on floor
            collideWorldBounds: true
        });
        this.red_door_group = this.physics.add.staticGroup({ // group for red doors
            collideWorldBounds: true
        })
        this.purple_door_group = this.physics.add.staticGroup({ // group for purple doors
            collideWorldBounds: true
        })

        //spawn spikes
        this.spike1 = this.spikegroup.create(42, 408, 'spikes');
        this.spike2 = this.spikegroup.create(420, 665, 'spikes');
        this.spike3 = this.spikegroup.create(540, 568, 'spikes');
        //this.spike4 = this.spikegroup.create(660, 37, 'spikes');
        //this.spike4.angle = 180;
        this.spike5 = this.spikegroup.create(700, 280, 'spikes');
        this.spike6 = this.spikegroup.create(540, 923, 'spikes');

        
        let layer = this.map.createLayer('ground',[tiles]);  // set layer name
        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, 1000, 1000);

        //spawn the puzzle exit
        this.exit = this.physics.add.staticSprite(63, 894, 'exit');

        //spawn doors 
        this.red_door_1 = this.red_door_group.create(425, 224, 'red_door-close');
        this.red_door_2 = this.red_door_group.create(136, 768, 'red_door-open');
        this.purple_door_1 = this.purple_door_group.create(425, 352, 'purple_door-close');
        this.purple_door_2 = this.purple_door_group.create(137, 896, "purple_door-open");

????????????????//main??character
????????????????this.main??=??new??Tony(this,??60,??35,??'idle_right',??0, 120).setOrigin(0,??0);
????????????????this.physics.add.existing(this.main);
        this.main.setScale(0.7);
        this.main.body.setSize(43, 85); 
????????????????this.main.body.setCollideWorldBounds(true);
????????????????this.main.body.onWorldBounds??=??true;

        //shadow
        this.shadow = this.add.sprite(0, 0, 'shadowfly1').setOrigin(0, 0);
        this.isPlay = false;

        this.findkey = this.add.sprite(this.main.x + 56, this.main.y - 3, 'findkey');
        this.findkey.setScale(1.3);
        this.findkey.setVisible(false);

        //puzzle passing condition
        let istouch = false;
        this.physics.add.overlap(this.main, this.exit, () => {
            if(this.isPass) {
                if(!istouch) {
                    istouch = true;
                    this.input.keyboard.enabled = false;
                    this.exit.setTexture('exit-unlock');
                    this.clock = this.time.delayedCall(2000, () => {
                        this.bigdooropen.play();
                        this.exit.setTexture('exit-open');
                    }, null, this);
                    this.clock = this.time.delayedCall(5000, () => {
                        this.input.keyboard.enabled = true;
                        this.main.body.setVelocity(0);
                        this.running.stop();
                        this.scene.start('puzzle2Scene');
                    }, null, this);
                }
            } else {
                console.log("key?");
                this.findkey.setVisible(true);
                this.time.delayedCall(5000, () => {
                    this.findkey.setVisible(false);
                })
            }
        });


        //jump mechanics
????????????????this.physics.world.on('worldbounds',??()??=>??{
????????????????????????isJump??=??false;
????????????????});


        this.physics.add.collider(this.main, layer, ()=> {
            isJump = false;
        }); 

        //spawn key
        this.key = this.physics.add.staticSprite(310, 365, 'key');
        this.key.setScale(0.6);
        this.physics.add.overlap(this.key, this.main, () => {
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.pickkey.play();
                this.key.destroy();
                this.isPass = true;
            }
        })
        
        //spawn buttons
        this.physics.add.collider(this.buttongroup, layer);
        this.button1 = this.buttongroup.create(375,120, 'button-up');
        this.button1.setSize(32,7);
        this.button1_sub = this.buttongroup.create(375,115, 'button-up');
        this.button1_sub.alpha = 0;
        this.button1_sub.body.setSize(15, 3);
        this.physics.add.collider(this.button1, this.button1_sub);
        this.physics.add.collider(this.button1, this.main, () => {
            isJump = false;
        });
        let played1 = false;
        this.physics.add.overlap(this.button1_sub, this.main, () => {
            isJump = false;
            if(!played1) {
                this.stepbutton.play();
                played1 = true;
            }
            this.button1.setTexture('button-down');
            this.floordoor1.setTexture('floor_door_open');
            this.floordoor1.setActive(false);
            this.floordoor1.body.enable = false;
        });
        
        this.button2 = this.buttongroup.create(310, 250, 'button-up');
        this.button2.setSize(32, 7);
        this.button2_sub = this.buttongroup.create(310, 245, 'button-up');
        this.button2_sub.alpha = 0;
        this.button2_sub.body.setSize(15, 3);
        this.physics.add.collider(this.button2, this.button2_sub);
        this.physics.add.collider(this.button2, this.main, () => {
            isJump = false;
        });
        let played2 = false;
        this.physics.add.overlap(this.button2_sub, this.main, () => {
            isJump = false;
            if(!played2) {
                this.stepbutton.play();
                played2 = true;
            }
            this.button2.setTexture('button-down');
            this.floordoor2.setTexture('floor_door_open');
            this.floordoor2.setActive(false);
            this.floordoor2.body.enable = false;
        });

        this.button3 = this.buttongroup.create(70, 795, 'button-up');
        this.button3.setSize(32, 7);
        this.button3_sub = this.buttongroup.create(70, 790, 'button-up');
        this.button3_sub.alpha = 0;
        this.button3_sub.body.setSize(15, 3);
        this.physics.add.collider(this.button3, this.button3_sub);
        this.physics.add.collider(this.button3, this.main, () => {
            isJump = false;
        });
        let played3 = false;
        this.physics.add.overlap(this.button3_sub, this.main, () => {
            isJump = false;
            if(!played3) {
                this.stepbutton.play();
                played3 = true;
            }
            this.button3.setTexture('button-down');
            this.floordoor3.setTexture('floor_door_open');
            this.floordoor3.setActive(false);
            this.floordoor3.body.enable = false;
        });


        //spawn floor_doors
        this.floordoor1 = this.floor_door_group.create(224, 144, 'floor_door');
        this.floordoor2 = this.floor_door_group.create(864, 689, 'floor_door');
        this.floordoor3 = this.floor_door_group.create(320, 816, 'floor_door');

        //add colliders for the floor_door_group
        this.physics.add.collider(this.floor_door_group, layer);
        this.physics.add.collider(this.floor_door_group, this.main, () => {
            isJump = false;
        });

        //spike colliders
        this.physics.add.collider(this.spikegroup, layer);
        this.isspikeSound = false;
        this.physics.add.collider(this.spikegroup, this.main, () => {
            if(!this.isspikeSound) {
                this.hitspike.play();
                this.isspikeSound = true;
            }
            this.reset();
        })

        //doors collider
        this.physics.add.collider(this.red_door_group, layer);
        this.physics.add.collider(this.red_door_group, this.main);
        this.physics.add.collider(this.purple_door_group, layer);
        this.physics.add.collider(this.purple_door_group, this.main);

        //controller colliders
        this.physics.add.collider(this.controllergroup, layer);
        this.physics.add.collider(this.controllergroup, this.main);

        //spawn controllers
        this.controller1 = this.controllergroup.create(610, 402, 'controller1-left');
        this.controller1_sub = this.physics.add.staticSprite(610, 402, 'controller1-left');
        this.controller1_sub.body.setSize(64,32);
        this.controller1_sub.alpha = 0;
        this.physics.add.overlap(this.controller1_sub, this.main, () => {
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.opendoor.play();
                if(this.control_red % 2 == 0){
                    this.controller1.setTexture('controller1-left');
                    this.red_door_1.setTexture('red_door-close');
                    this.red_door_2.setTexture('red_door-open');
                    this.red_door_1.body.enable = true;
                    this.red_door_2.body.enable = false;
                } else {
                    this.controller1.setTexture('controller1-right');
                    this.red_door_2.setTexture('red_door-close');
                    this.red_door_1.setTexture('red_door-open');
                    this.red_door_2.body.enable = true;
                    this.red_door_1.body.enable = false;
                }
                this.control_red += 1;
            }
        })

        this.controller2 = this.controllergroup.create(438, 913, 'controller2-left');
        this.controller2_sub = this.physics.add.staticSprite(438, 913, 'controller2-left');
        this.controller2_sub.body.setSize(64,32);
        this.controller2_sub.alpha = 0;
        this.physics.add.overlap(this.controller2_sub, this.main, () => {
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.opendoor.play();
                if(this.control_purple % 2 == 0){
                    this.controller2.setTexture('controller2-left');
                    this.purple_door_1.setTexture('purple_door-close');
                    this.purple_door_2.setTexture('purple_door-open');
                    this.purple_door_1.body.enable = true;
                    this.purple_door_2.body.enable = false;
                } else {
                    this.controller2.setTexture('controller2-right');
                    this.purple_door_2.setTexture('purple_door-close');
                    this.purple_door_1.setTexture('purple_door-open');
                    this.purple_door_2.body.enable = true;
                    this.purple_door_1.body.enable = false;
                }
                this.control_purple += 1;
            }
        })

????????????????//camera??setting
????????????????this.cameras.main.setBounds(0,??0,??960, 960);
????????????????this.cameras.main.startFollow(this.main,??false,??1,??1,??0,??155);
        
        //show layer hitbox
        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        layer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        }); */  

        const pic = this.add.sprite(0, 0, 'black').setOrigin(0, 0);
        this.shape = this.make.graphics();

        this.shape.fillStyle(0xffffff);
        this.shape.beginPath();
        this.shape.moveTo(0, 0);
        this.shape.arc(0, 0, 180, 0, Math.PI * 2);

        this.shape.fillPath();

        const mask = this.shape.createGeometryMask();
        mask.setInvertAlpha();

        pic.setMask(mask);


        //play initial animation
        this.cameras.main.zoomTo(2, 1000);
        this.time.delayedCall(2000, () => {
            let question = this.add.sprite(this.main.x + 55, this.main.y, 'question'); //?
            question.anims.play('what');
            question.on('animationcomplete', () => {
                question.destroy();
                this.shadow.anims.play('flyshadow1',true);
                this.shadow.on('animationcomplete', () => {
                    this.time.delayedCall(2000, () => {
                        this.cameras.main.zoomTo(1, 1000);
                        this.cameras.main.centerOn(0, 0);
                        this.shadow.destroy();
                        this.isPlay = true;
                    });
                });
            });
        });

        //play bgm
        this.puzzle1bgm.play();

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

        this.pressspace.anims.play('pressspace', true);

        if(!this.isPlay) {
            this.main.body.setVelocityX(0);
            this.input.keyboard.enabled = false;
        }

        if(this.isPlay) {
            this.space.setVisible(true);
            this.arrowup.setVisible(true);
            this.input.keyboard.enabled = true;
        }
        
        if(Phaser.Input.Keyboard.JustDown(keyF1)) {
            this.isPass = true;
            this.puzzle1bgm.stop();
            this.scene.start('puzzle2Scene');
        }

        this.findkey.setPosition(this.main.x + 50, this.main.y - 1);
        
        this.main.update();
        this.shape.x = this.main.x;
        this.shape.y = this.main.y - 10;


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
        this.main.x = 60;
        this.main.y = 35;
        this.isspikeSound = false;
    }
}