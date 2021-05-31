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
            isStop = false;
            isLeft = true;
            isRight = false;
        } else if(keyD.isDown && !keyA.isDown) { //walk right
            this.body.setVelocityX(this.moveSpeed);
            isStop = false;
            isLeft = false;
            isRight = true;
        } else { //idle
            this.body.setVelocityX(0);
            isStop = true;
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !isJump) { //jump
            this.body.setVelocityY(-120);
            isStop = true;
            isJump = true;
        }
    }
    

}