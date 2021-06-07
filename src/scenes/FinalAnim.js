class FinalAnim extends Phaser.Scene {
    constructor() {
        super('exitScene');
    }

    preload() {
        this.load.spritesheet('anim0', './assets/Exit_Animation_0.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('anim1', './assets/Exit_Animation_1.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('anim2', './assets/Exit_Animation_2.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('anim3', './assets/Exit_Animation_3.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('anim4', './assets/Exit_Animation_4.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('anim5', './assets/Exit_Animation_5.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('anim6', './assets/Exit_Animation_6.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('anim7', './assets/Exit_Animation_7.png', {
            frameWidth: 640,
            frameHeight: 480
        });


    }

    create() {
        this.anims.create({
            key:'exit0',
            frames: this.anims.generateFrameNumbers('anim0'),
            frameRate: 8
        }); 
        this.anims.create({
            key:'exit1',
            frames: this.anims.generateFrameNumbers('anim1'),
            frameRate: 8
        }); 
        this.anims.create({
            key:'exit2',
            frames: this.anims.generateFrameNumbers('anim2'),
            frameRate: 8
        }); 
        this.anims.create({
            key:'exit3',
            frames: this.anims.generateFrameNumbers('anim3'),
            frameRate: 8
        }); 
        this.anims.create({
            key:'exit4',
            frames: this.anims.generateFrameNumbers('anim4'),
            frameRate: 8
        }); 
        this.anims.create({
            key:'exit5',
            frames: this.anims.generateFrameNumbers('anim5'),
            frameRate: 8
        }); 
        this.anims.create({
            key:'exit6',
            frames: this.anims.generateFrameNumbers('anim6'),
            frameRate: 8
        }); 
        this.anims.create({
            key:'exit7',
            frames: this.anims.generateFrameNumbers('anim7'),
            frameRate: 8
        }); 
        
        this.animation = this.add.sprite(0 , 0, 'anim1').setOrigin(0, 0);

        this.animation.anims.play('exit0', true);
        this.animation.on('animationcomplete', () => {
            this.animation.anims.play('exit1', true);
            this.animation.on('animationcomplete', () => { //play anim one by one
                this.animation.anims.play('exit2');
                this.animation.on('animationcomplete', () => {
                    this.animation.anims.play('exit3');
                    this.animation.on('animationcomplete', () => {
                        this.animation.anims.play('exit4');
                        this.animation.on('animationcomplete', () => {
                            this.animation.anims.play('exit5');
                            this.animation.on('animationcomplete', () => {
                                this.animation.anims.play('exit6');
                                this.animation.on('animationcomplete', () => {
                                    this.animation.anims.play('exit7');
                                    this.time.delayedCall(1000, () => {
                                        this.scene.start('creditScene');
                                    })
                                })
                            })
                        })
                    })
                });
            });
        });

    }
}