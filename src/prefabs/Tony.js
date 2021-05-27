//main character prefab
class Tony extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, moveSpeed) {
        super(scene, x, y, texture, frame);
        
        //add object to existing scenes
        scene.add.existing(this);
        this.moveSpeed = moveSpeed;
    }

    update() {

        //movement 
        if(keyA.isDown && !keyD.isDown) { //walk left
            this.body.setVelocityX(-this.moveSpeed);
            isLeft = true;
        } else if(keyD.isDown && !keyA.isDown) { //walk right
            this.body.setVelocityX(this.moveSpeed);
            isRight = true;
        } else { //idle
            this.body.setVelocityX(0);
            isLeft = false;
            isRight = false;
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !isJump) { //jump
            this.body.setVelocityY(-150);
            isJump = true;
        }
    }
    

}