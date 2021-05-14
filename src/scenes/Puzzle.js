class Puzzle extends Phaser.Scene{
    constructor() {
        super("puzzleScene");
    }

    preload() {
        //load images and spritesheets
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap1.json')
        this.load.image('tiles', 'assets/tilemaps/tilesets.png');  
        //this.load.image('button1', './assets/images/botton1.png');
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
    }

    create() {
        //create animation
        this.anims.create({
            key:'stepon',
            frames: this.anims.generateFrameNumbers('button1',{
                start: 1,
                end:2,
                first: 1
            }),
            frameRate: 8
        });

        this.anims.create({
            key:'turnknob',
            frames: this.anims.generateFrameNumbers('controller1',{
                start: 1,
                end:2,
                first: 1
            }),
            frameRate: 8
        });

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

        //spawn spikes
        this.spike1 = this.spikegroup.create(42, 408, 'spikes');
        this.spike2 = this.spikegroup.create(420, 665, 'spikes');
        this.spike3 = this.spikegroup.create(540, 568, 'spikes');

        //create the map
        this.map = this.add.tilemap('map'); 
        let tiles = this.map.addTilesetImage('tilesets','tiles');  // set tileset name
        let layer = this.map.createLayer('ground',[tiles]);  // set layer name
        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, 1000, 1000);

        //main character
        this.main = new Tony(this, 60, 35, 'tony_walk', 0).setOrigin(0, 0);
        this.main.setScale(0.5);
        this.physics.add.existing(this.main);
        this.main.body.setCollideWorldBounds(true);
        this.main.body.onWorldBounds = true;

        //jump mechanics
        this.physics.world.on('worldbounds', () => {
            isJump = false;
        });

        this.physics.add.collider(this.main, layer, ()=> {
            isJump = false;
        });

        //spawn buttons
        this.physics.add.collider(this.buttongroup, layer);
        this.button1 = this.buttongroup.create(380,123, 'button1');
        this.button2 = this.buttongroup.create(380,115, 'button1');
        this.button2.alpha = 0;
        this.button2.body.setSize(20, 3);
        this.physics.add.collider(this.button1, this.button2);
        this.physics.add.collider(this.button1, this.main);
        this.physics.add.overlap(this.button2, this.main, () => {
            this.button1.anims.play('stepon');
            this.door1.destroy();
            this.interact.alpha = 0;
        });

        //spawn doors
        this.door1 = this.physics.add.staticSprite(223, 132, 'floor_door');
        this.physics.add.collider(this.door1, layer);
        this.physics.add.collider(this.door1, this.main);

        //spike colliders
        this.physics.add.collider(this.spikegroup, layer);
        this.physics.add.collider(this.spikegroup, this.main, () => {
            this.scene.restart();
        })

        //controller colliders
        this.physics.add.collider(this.controllergroup, layer);
        this.physics.add.collider(this.controllergroup, this.main);

        //spawn controllers
        this.controller1 = this.controllergroup.create(610, 400, 'controller1');
        this.controller1_sub = this.physics.add.staticSprite(610, 400, 'controller1');
        this.controller1_sub.body.setSize(64,32);
        this.controller1_sub.alpha = 0;
        this.physics.add.overlap(this.controller1_sub, this.main, () => {
            if(keyE.isDown) {
                this.controller1.anims.play('turnknob');
                this.instruction.text = "Surprise!";
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

        //this.map.setCollideWorldBounds(true);
       
        //this.cursors = this.input.keyboard.createCursorKeys();

        /* this.controlConfig = {
            camera: this.cameras.main,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
            //acceleration: 0.04,
            //drag: 0.0005,
            //maxSpeed: 0.7
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);*/
        //this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(this.controlConfig);
    
        //this.layer.setTileLocationCallback()=>{};
        
    }

    update() {
        this.main.update();

        //this.controls.update();
    }
}