//main character prefab
class Tony extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        //add object to existing scenes
        scene.add.existing(this);
    }

    update() {
        if(keyA.isDown) {
            this.body.setVelocityX(-100);
            isLeft = true;
        } else if(keyD.isDown) {
            this.body.setVelocityX(100);
            isRight = true;
        } else {
            this.body.setVelocityX(0);
            isLeft = false;
            isRight = false;
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !isJump) {
            this.body.setVelocityY(-150);
            isJump = true;
        }
    }
    

}