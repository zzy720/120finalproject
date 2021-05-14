class Puzzle extends Phaser.Scene{
    constructor() {
        super("puzzleScene");
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap1.json')
        this.load.image('tiles', 'assets/tilemaps/tilesets.png');  
    }

    create() {
         //this.add.text(400,230, "puzzle", scoreConfig);
        //player input definition
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.map = this.add.tilemap('map'); 
        let tiles = this.map.addTilesetImage('tilesets','tiles');  // set tileset name
        let layer = this.map.createLayer('ground',[tiles]);  // set layer name
        //this.layer.resizeWorld();

        //main character
        this.main = new Tony(this, 60, 35, 'tony_walk', 0).setOrigin(0, 0);
        this.physics.add.existing(this.main);
        this.main.body.setCollideWorldBounds(true);
        this.main.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', () => {
            isJump = false;
        });

        //camera setting
        this.cameras.main.setBounds(0, 0, 5000, game.config.height);
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155);


        //this.map = this.add.tilemap('map'); 
        //let tiles = this.map.addTilesetImage('tilesets','tiles');  // set tileset name
        //let layer = this.map.createLayer('ground',[tiles]);  // set layer name
        //this.layer.resizeWorld();
        
        this.physics.add.collider(this.main,layer);
        layer.setCollisionByProperty({ collides: true });

        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        layer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

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