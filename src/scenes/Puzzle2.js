class Puzzle2 extends Phaser.Scene {
    constructor() {
        super('puzzle2Scene');
    }

    preload() {
        this.load.tilemapTiledJSON('map2', 'assets/tilemaps/tilemap2.json')
        this.load.image('tiles3', 'assets/tilemaps/tileset3.png');  //1024*1024
    }

    create() {
        this.map = this.add.tilemap('map2'); 
        let tiles3 = this.map.addTilesetImage('tileset3','tiles3');  // set tileset name
        let layer = this.map.createLayer('ground',[tiles3]);  // set layer name
    }

    update() {

        
    }
}