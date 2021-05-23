class Puzzle2 extends Phaser.Scene {
    constructor() {
        super('puzzle2Scene');
    }

    preload() {
        this.load.tilemapTiledJSON('map2', 'assets/tilemaps/tilemap2.json')
        this.load.image('tiles3', 'assets/tilemaps/tilesets3.png');  //1024*1024
    }

    create() {
        this.map = this.add.tilemap('map2'); 
        let tiles = this.map.addTilesetImage('tilesets3','tiles');  // set tileset name
        let layer = this.map.createLayer('ground',[tiles3]);  // set layer name
    }

    update() {

        
    }
}