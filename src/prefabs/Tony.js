//main character prefab
class Tony extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        //add object to existing scenes
        scene.add.existing(this);
    }

    update() {
    }


}