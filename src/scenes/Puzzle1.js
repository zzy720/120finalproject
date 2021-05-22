class Puzzle1 extends Phaser.Scene{
    constructor() {
        super("puzzle1Scene");
    }

    preload() {
        //load images and spritesheets
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap1.json')
        this.load.image('tiles', 'assets/tilemaps/tilesets.png');  
        this.load.image('tiles2', 'assets/tilemaps/tilesets2.png'); 
        this.load.spritesheet('button1', './assets/images/botton1-Sheet.png', {
            frameWidth: 32,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 1
        });
        this.load.image('floor_door', './assets/images/door.png');
        this.load.image('spikes', './assets/images/obstacle.png');
        this.load.spritesheet('controller1', './assets/images/controler1-Sheet.png', {
            frameWidth: 32,
            frameHeight:32,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('controller2', './assets/images/controler2-Sheet.png', {
            frameWidth: 32,
            frameHeight:32,
            startFrame: 0,
            endFrame: 1
        });
        this.load.image('red_door', './assets/images/door1.png');
        this.load.image('purple_door', './assets/images/door2.png');
        this.load.image('key', './assets/images/key.png');
        this.load.image('exit', './assets/images/bigdoor.png');
    }

    create() {
        //controller control count initialize
        this.control_red = 1;
        this.control_purple = 1;

        //passing the puzzle condition
        this.isPass = false;

        //create animation
        this.anims.create({
            key:'stepon',
            frames: this.anims.generateFrameNumbers('button1',{
                start: 1,
                end:1,
                first: 1
            }),
            frameRate: 8
        });

        this.anims.create({
            key:'turnknob_red',
            frames: this.anims.generateFrameNumbers('controller1',{
                start: 1,
                end:1,
                first: 1
            }),
            frameRate: 8
        });

        this.anims.create({
            key:'turnknob_purple',
            frames: this.anims.generateFrameNumbers('controller2',{
                start: 1,
                end:1,
                first: 1
            }),
            frameRate: 8
        });
        
        //create the map
        this.map = this.add.tilemap('map'); 
        let tiles = this.map.addTilesetImage('tilesets','tiles');  // set tileset name
        let tiles2 = this.map.addTilesetImage('tilesets2','tiles2');
        let backgroundlayer = this.map.createLayer('background',[tiles2]);
        let layer = this.map.createLayer('ground',[tiles]);  // set layer name
                

        //interaction guide
        this.interact = this.add.text(220, 70, "try to step on it", scoreConfig);
        this.instruction = this.add.text( 600, 350, "Press E to interact", scoreConfig);

        //player input definition
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
        this.spike4 = this.spikegroup.create(700, 37, 'spikes');
        this.spike4.angle = 180;
        this.spike5 = this.spikegroup.create(700, 280, 'spikes');
        this.spike6 = this.spikegroup.create(540, 923, 'spikes');


        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, 1000, 1000);

        //spawn the puzzle exit
        this.exit = this.physics.add.staticSprite(66, 894, 'exit');

        //main character
        this.main = new Tony(this, 60, 35, 'tony_walk', 0).setOrigin(0, 0);
        this.main.setScale(0.5);
        this.physics.add.existing(this.main);
        this.main.body.setCollideWorldBounds(true);
        this.main.body.onWorldBounds = true;

        //puzzle passing condition
        this.physics.add.overlap(this.main, this.exit, () => {
            if(this.isPass) {
                console.log("yay");
            } else {
                console.log("key?");
            }
        });

        //jump mechanics
        this.physics.world.on('worldbounds', () => {
            isJump = false;
        });

        this.physics.add.collider(this.main, layer, ()=> {
            isJump = false;
        });

        //spawn key
        this.key = this.physics.add.staticSprite(310, 362, 'key');
        this.key.setScale(0.8);
        this.key.body.setSize(20, 40);
        this.physics.add.overlap(this.key, this.main, () => {
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.key.destroy();
                this.isPass = true;
            }
        })
        
        //spawn buttons
        this.physics.add.collider(this.buttongroup, layer);
        this.button1 = this.buttongroup.create(380,123, 'button1');
        this.button1_sub = this.buttongroup.create(380,115, 'button1');
        this.button1_sub.alpha = 0;
        this.button1_sub.body.setSize(20, 3);
        this.physics.add.collider(this.button1, this.button1_sub);
        this.physics.add.collider(this.button1, this.main);
        this.physics.add.overlap(this.button1_sub, this.main, () => {
            this.button1.anims.play('stepon');
            this.floordoor1.destroy();
            this.interact.alpha = 0;
        });
        
        this.button2 = this.buttongroup.create(310, 250, 'button1');
        this.button2_sub = this.buttongroup.create(310, 242, 'button1');
        this.button2_sub.alpha = 0;
        this.button2_sub.body.setSize(20, 3);
        this.physics.add.collider(this.button2, this.button2_sub);
        this.physics.add.collider(this.button2, this.main);
        this.physics.add.overlap(this.button2_sub, this.main, () => {
            this.button2.anims.play('stepon');
            this.floordoor2.destroy();
        });

        this.button3 = this.buttongroup.create(90, 791, 'button1');
        this.button3_sub = this.buttongroup.create(90, 783, 'button1');
        this.button3_sub.alpha = 0;
        this.button3_sub.body.setSize(20, 3);
        this.physics.add.collider(this.button3, this.button3_sub);
        this.physics.add.collider(this.button3, this.main);
        this.physics.add.overlap(this.button3_sub, this.main, () => {
            this.button3.anims.play('stepon');
            this.floordoor3.destroy();
        });


        //spawn floor_doors
        this.floordoor1 = this.floor_door_group.create(223, 132, 'floor_door');
        this.floordoor2 = this.floor_door_group.create(864, 680, 'floor_door');
        this.floordoor3 = this.floor_door_group.create(320, 807, 'floor_door' );

        //add colliders for the floor_door_group
        this.physics.add.collider(this.floor_door_group, layer);
        this.physics.add.collider(this.floor_door_group, this.main);

        //spike colliders
        this.physics.add.collider(this.spikegroup, layer);
        this.physics.add.collider(this.spikegroup, this.main, () => {
            this.scene.restart();
        })

        //doors collider
        this.physics.add.collider(this.red_door_group, layer);
        this.physics.add.collider(this.red_door_group, this.main);
        this.physics.add.collider(this.purple_door_group, layer);
        this.physics.add.collider(this.purple_door_group, this.main);

        //spawn doors 
        this.red_door_1 = this.red_door_group.create(434, 223, 'red_door');
        this.red_door_2 = this.red_door_group.create(142, 770, 'red_door');
        this.purple_door_1 = this.purple_door_group.create(434, 350, 'purple_door');
        this.purple_door_2 = this.purple_door_group.create(142, 896, "purple_door");

        //controller colliders
        this.physics.add.collider(this.controllergroup, layer);
        this.physics.add.collider(this.controllergroup, this.main);

        //spawn controllers
        this.controller1 = this.controllergroup.create(610, 400, 'controller1');
        this.controller1_sub = this.physics.add.staticSprite(610, 400, 'controller1');
        this.controller1_sub.body.setSize(64,32);
        this.controller1_sub.alpha = 0;
        this.physics.add.overlap(this.controller1_sub, this.main, () => {
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.controller1.anims.play('turnknob_red');
                if(this.control_red % 2 == 0){
                    this.red_door_1.setActive(true).setVisible(true);
                    this.red_door_2.setActive(false).setVisible(false);
                    this.red_door_1.body.enable = true;
                    this.red_door_2.body.enable = false;
                } else {
                    this.red_door_1.setActive(false).setVisible(false);
                    this.red_door_2.setActive(true).setVisible(true);
                    this.red_door_2.body.enable = true;
                    this.red_door_1.body.enable = false;
                }
                this.control_red += 1;
            }
        })

        this.controller2 = this.controllergroup.create(438, 913, 'controller2');
        this.controller2_sub = this.physics.add.staticSprite(438, 913, 'controller2');
        this.controller2_sub.body.setSize(64,32);
        this.controller2_sub.alpha = 0;
        this.physics.add.overlap(this.controller2_sub, this.main, () => {
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.controller2.anims.play('turnknob_purple');
                if(this.control_purple % 2 == 0){
                    this.purple_door_1.setActive(true).setVisible(true);
                    this.purple_door_2.setActive(false).setVisible(false);
                    this.purple_door_1.body.enable = true;
                    this.purple_door_2.body.enable = false;
                } else {
                    this.purple_door_1.setActive(false).setVisible(false);
                    this.purple_door_2.setActive(true).setVisible(true);
                    this.purple_door_2.body.enable = true;
                    this.purple_door_1.body.enable = false;
                }
                this.control_purple += 1;
            }
        })

        //camera setting
        this.cameras.main.setBounds(0, 0, 960, 960);
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155);
        
        //show layer hitbox
        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        layer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        }); */
        
    }

    update() {
        this.main.update();
    }
}