class Puzzle extends Phaser.Scene{
    constructor() {
        super("puzzleScene");
    }

    preload() {

    }

    create() {
        this.add.text(400,230, "puzzle", scoreConfig);
        
    }
}