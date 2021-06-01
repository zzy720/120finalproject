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
    }

    create() {
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
        this.physics.world.setBounds(0, 0, 1000, 1000);

        //player input definition
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //create main character
        this.main = new Tony(this, 60, 35, 'walk_right', 0, 120).setOrigin(0, 0);
        this.physics.add.existing(this.main);
        this.main.setScale(0.6);
        this.main.body.setSize(48, 75); 
        this.main.body.setCollideWorldBounds(true);
        this.main.body.onWorldBounds = true;

        //jump mechanics 
        this.physics.world.on('worldbounds', () => {
                isJump = false;
            });
    
        this.physics.add.collider(this.main, layer, ()=> {
            isJump = false;
        });




        //camera setting
        this.cameras.main.setBounds(0, 0, 1024, 1024);
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start('puzzle1Scene');
        }
        this.main.update();
        
    }
}