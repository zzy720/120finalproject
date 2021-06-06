class Funeral extends Phaser.Scene{
    constructor() {
        super("funeralScene");
    }

    preload() {
        //load image

        //Main Character Animation
        this.load.spritesheet('walk_left', './assets/L_Walk.png', {
            frameWidth: 48,
            frameHeight: 80
        });
        this.load.spritesheet('walk_right', './assets/R_Walk.png', {
            frameWidth: 48,
            frameHeight: 80
        });
        this.load.spritesheet('idle_right', './assets/R_Idle.png', {
            frameWidth: 64,
            frameHeight: 96
        });
        this.load.spritesheet('idle_left', './assets/L_Idle.png', {
            frameWidth: 64,
            frameHeight: 96
        });

        //characters
        this.load.spritesheet('cousin1', './assets/Cousin_1.png', {
            frameWidth: 27,
            frameHeight: 80
        });
        this.load.spritesheet('cousin2', './assets/Cousin_2.png', {
            frameWidth: 27,
            frameHeight: 80
        });
        this.load.spritesheet('cousin3', './assets/Cousin_3.png', {
            frameWidth: 24,
            frameHeight: 56
        });
        this.load.spritesheet('cousin4', './assets/Cousin_4.png', {
            frameWidth: 22,
            frameHeight: 53
        });
        this.load.spritesheet('grandparents', './assets/grandparents.png', {
            frameWidth: 80,
            frameHeight: 88
        });
        this.load.spritesheet('shadow', './assets/Mom_Ghost.png', {
            frameWidth: 33,
            frameHeight: 73
        });
        this.load.spritesheet('dad', './assets/dad.png', {
            frameWidth: 80,
            frameHeight: 101
        });
        this.load.spritesheet('uncle', './assets/uncle.png', {
            frameWidth: 80,
            frameHeight: 103
        });

        this.load.image('interact', './assets/interact.png');
        this.load.image('rip', './assets/Grave.png');
        this.load.image('dialog', './assets/images/dialog.png');
        this.load.image('FuneralBack', './assets/Funeral.png');

        //UI
        this.load.image('keyA', './assets/images/keya.png');
        this.load.image('keyD', './assets/images/keyd.png');
        this.load.image('keyE', './assets/images/keye.png');
        this.load.image('keySPACE', './assets/images/keyspace.png');
        this.load.image('arrowUP', './assets/images/arrow1.png');
        this.load.image('arrowRIGHT', './assets/images/arrow2.png');
        this.load.image('arrowLEFT', './assets/images/arrow3.png');

        //scene animation
        this.load.spritesheet('rain', './assets/Rain_Animation.png', {
            frameWidth: 1500,
            frameHeight: 480
        });
        this.load.spritesheet('glow', './assets/Shadow_Glow.png', {
            frameWidth: 640,
            frameHeight: 480
        });
        this.load.spritesheet('3dots', './assets/3dots.png', {
            frameWidth: 25,
            frameHeight: 18
        });
        this.load.spritesheet('question', './assets/question.png', {
            frameWidth: 25,
            frameHeight: 18
        });

    }

    create() {
        isRight = true; //initially facing right
        this.hastalked = false; //talked to cousin4 or not
        this.dialogorder = 0; //dialogue counter

        this.cousin4dialogue = ["cousin4:  Hello! This is a demonstration", "cousin4:  of the dialogue mechanism", "cousin4:  Go right side and found the stone", "cousin4:  and you will know what to do"];

        //create animation
        //main character animation
        this.anims.create({
            key:'leftwalk',
            frames: this.anims.generateFrameNumbers('walk_left'),
            frameRate: 8
        }); 
        this.anims.create({
            key: 'rightwalk',
            frames: this.anims.generateFrameNumbers('walk_right'),
            frameRate: 8
        });
        this.anims.create({
            key:'leftidle',
            frames: this.anims.generateFrameNumbers('idle_left'),
            frameRate: 3
        }); 
        this.anims.create({
            key: 'rightidle',
            frames: this.anims.generateFrameNumbers('idle_right'),
            frameRate: 3
        });

        //NPC idle animations
        this.anims.create({
            key: 'cousin1idle',
            frames: this.anims.generateFrameNumbers('cousin1'),
            frameRate: 3
        });
        this.anims.create({
            key: 'cousin2idle',
            frames: this.anims.generateFrameNumbers('cousin2'),
            frameRate: 3
        });       
         this.anims.create({
            key: 'cousin3idle',
            frames: this.anims.generateFrameNumbers('cousin3'),
            frameRate: 3
        });        
        this.anims.create({
            key: 'cousin4idle',
            frames: this.anims.generateFrameNumbers('cousin4'),
            frameRate: 4
        });
        this.anims.create({
            key: 'grandmaidle',
            frames: this.anims.generateFrameNumbers('grandparents'),
            frameRate: 1
        });
        this.anims.create({
            key: 'dadidle',
            frames: this.anims.generateFrameNumbers('dad'),
            frameRate: 3
        });
        this.anims.create({
            key: 'uncleidle',
            frames: this.anims.generateFrameNumbers('uncle'),
            frameRate: 3
        });
        this.anims.create({
            key: 'shadowidle',
            frames: this.anims.generateFrameNumbers('shadow'),
            frameRate: 3
        })


        this.anims.create({
            key: 'raindrop',
            frames: this.anims.generateFrameNumbers('rain'),
            frameRate: 20
        });
        this.anims.create({
            key: 'shine',
            frames: this.anims.generateFrameNumbers('glow'),
            frameRate: 8
        });
        this.anims.create({
            key: 'uhh',
            frames: this.anims.generateFrameNumbers('3dots'),
            frameRate: 7
        })
        this.anims.create({
            key: 'what',
            frames: this.anims.generateFrameNumbers('question'),
            frameRate: 5
        })




        //player input definition
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //set world boundary
        this.physics.world.setBounds(0, 0, 1500, game.config.height - 30);

        this.background = this.add.sprite(0, 0, 'FuneralBack').setOrigin(0, 0);

        
        //tomb object 
        this.tomb = this.physics.add.staticSprite(1400, 419, 'rip');
        this.inter = false; //is it interacting with the tomb object?

        this.tomb_sub = this.physics.add.staticSprite(1400, 419, 'rip');
        this.tomb_sub.alpha = 0;
        this.tomb_sub.body.setSize(150, 48);
        this.isTomb = false; //is it overlapping with the tomb object?
        this.interactTomb = this.add.sprite(0, 0, 'interact'); // ...
        this.interactTomb.setScale(1.3);

        this.rain = this.add.sprite(0, 0, 'rain').setOrigin(0, 0); //rain animation layer

        //grandparents NPC
        this.grandparents = this.physics.add.sprite(620, 450, 'grandparents');
        this.grandparents.body.setCollideWorldBounds(true);
        this.isGrandparents = false;
        this.interactGrandparents = this.add.sprite(0, 0, 'interact'); // ...
        this.interactGrandparents.setScale(1.3);

        //cousin3 NPC
        this.cousin3 = this.physics.add.sprite(500, 450, 'cousin3');
        this.cousin3.body.setCollideWorldBounds(true);
        this.isCousin3 = false;
        this.interactCousin3 = this.add.sprite(0, 0, 'interact'); // ...
        this.interactCousin3.setScale(1.3);

        //cousin4 NPC
        this.cousin4 = this.physics.add.sprite(400, 450, 'cousin4');
        this.cousin4.body.setCollideWorldBounds(true);
        this.isCousin4 = false;
        this.interactCousin4 = this.add.sprite(0, 0, 'interact'); // ...
        this.interactCousin4.setScale(1.3);

        //shadow
        this.shadow = this.physics.add.sprite(1475, 450, 'shadow');
        this.shadow.body.setCollideWorldBounds(true);
        this.shadow.setVisible(false);
        this.shadow.setScale(1.2);

        //main character
        this.main = new Tony(this, 100, 470, "idle_right", 0, 300).setOrigin(0, 0);
        this.physics.add.existing(this.main);
        this.main.body.setSize(48, 87)
        this.main.body.setCollideWorldBounds(true); //do not go out of the world
        this.main.body.onWorldBounds = true;

        //Implement UI

        //UI for moving instruction
        this.walkleft = this.add.sprite(this.main.x - 30, this.main.y - 140, 'keyA').setOrigin(0, 0);
        this.leftarrow = this.add.sprite(this.walkleft.x + 5, this.walkleft.y - 20, 'arrowLEFT').setOrigin(0, 0);
        this.leftarrow.setScale(0.5);

        this.walkright = this.add.sprite(this.main.x + 62, this.main.y - 140, 'keyD').setOrigin(0, 0);
        this.rightarrow = this.add.sprite(this.walkright.x + 7, this.walkright.y - 20, 'arrowRIGHT').setOrigin(0, 0);
        this.rightarrow.setScale(0.5);

        //UI for player interaction
        this.pressE = this.add.sprite(this.cousin4.x - 16, this.cousin4.y - 121, 'keyE').setOrigin(0, 0);
        this.pressE.setVisible(false);


        //dialogue box config
        this.back = this.add.sprite(0, 319, 'dialog');
        this.dialogue = this.add.text(40, 360, 'null', scoreConfig).setOrigin(0, 0);
        this.space = this.add.text(40, 440, "Press S to continue", scoreConfig);
        this.typing = this.add.text(100, 100, '', scoreConfig);

        //set to invisible when not activated
        this.back.setActive(false).setVisible(false);
        this.dialogue.setActive(false).setVisible(false);
        this.space.setActive(false).setVisible(false);

        //set interaction
        this.physics.add.collider(this.main, this.tomb);

        this.physics.add.overlap(this.main, this.tomb_sub, () => {
            console.log('ei');
            this.isTomb = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)){ //if player input
                console.log('true');
                this.inter = true;
                if(this.hastalked) { //if talked to cousin4
                    this.sound.play('button');
                    let question = this.add.sprite(this.main.x + 55, this.main.y, 'question'); //?
                    question.anims.play('what');
                    question.on('animationcomplete', () => {
                        question.destroy();
                    });
                    this.time.delayedCall(2000, () => {
                        let shine = this.add.sprite(860, 0, 'glow').setOrigin(0, 0);
                        shine.anims.play('shine');
                        shine.on('animationcomplete', () => {
                            this.inter = false;
                            this.scene.start('puzzle1Scene');
                        });
                    });
                } else {
                    let interact = this.add.sprite(this.main.x + 55, this.main.y, 'interact'); //...
                    interact.anims.play('uhh');
                    interact.on('animationcomplete', () => {
                        interact.destroy();
                        this.inter = false;
                    });

                }
            } 
        });

        //set interaction
        this.physics.add.overlap(this.main, this.cousin4, () => {
            this.isCousin4 = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.sound.play('button');
                this.pressE.destroy();
                isTalkingCousin4 = true;
            }
        });

        //set interaction
        this.physics.add.overlap(this.main, this.cousin3, () => {
            this.isCousin3 = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.sound.play('button');
                isTalkingCousin3 = true;
            }
        });
        
        //set interaction
        this.physics.add.overlap(this.main, this.grandparents, () => {
            this.isGrandparents = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.sound.play('button');
                isTalkingGrandparents = true;
            }
        });

        //camera setting
        this.cameras.main.setBounds(0, 0, 1500, game.config.height); //world bound
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155); //follow the main character
    }

    update() {

        isJump = true;
        this.main.update();

        this.back.setPosition(this.main.x, this.main.y + 30);
        this.dialogue.setPosition(this.back.x - 270, this.back.y - 40);
        this.typing.setPosition(this.back.x - 270, this.back.y - 40);
        this.space.setPosition(this.typing.x, this.typing.y + 75);
        
        this.cousin3.anims.play('cousin3idle', true);
        this.cousin4.anims.play('cousin4idle', true);
        this.grandparents.anims.play('grandmaidle', true);
        this.rain.anims.play('raindrop', true);
        this.shadow.anims.play('shadowidle', true);

        this.walkleft.setPosition(this.main.x - 30, this.main.y - 30);
        this.leftarrow.setPosition(this.walkleft.x + 5, this.walkleft.y - 20);
        this.walkright.setPosition(this.main.x + 60, this.main.y - 30);
        this.rightarrow.setPosition(this.walkright.x + 5, this.walkright.y - 20);

        if(!isStop){

            //destroy UI 200ms after start walking
            this.time.delayedCall(200, () => {
                this.walkleft.destroy();
                this.leftarrow.destroy();
                this.walkright.destroy();
                this.rightarrow.destroy();
            });
            
            if(isRight) {
                this.main.anims.play('rightwalk', true);
            }
            if (isLeft) {
                this.main.anims.play('leftwalk', true);
            }
        } else {
            if(isRight) {
                this.main.anims.play('rightidle', true);
            }
            if (isLeft) {
                this.main.anims.play('leftidle', true);
            }
        }

        

        //if interact with tomb then player cannot move
        if(this.inter) {
            this.main.body.setVelocity(0);
            this.isStop = true;
        } else {
            //this.input.keyboard.enabled = true;
        }
        
        if(this.isTomb){
            this.interactTomb.setVisible(true);
            this.interactTomb.setPosition(this.tomb.x + 40, this.tomb.y - 55)
        } else {
            this.interactTomb.setVisible(false);
        }

        this.isTomb = false;
        
        //if overlap then show interaction text

        if(this.isCousin4) {
            this.interactCousin4.setVisible(true);
            this.pressE.setVisible(true);
            this.interactCousin4.setPosition(this.cousin4.x + 20, this.cousin4.y - 35)
        } else {
            this.interactCousin4.setVisible(false);
            this.pressE.setVisible(false);
        }

        this.isCousin4 = false; 

        
        if(this.isCousin3) {
            this.interactCousin3.setVisible(true);
            this.interactCousin3.setPosition(this.cousin3.x + 20, this.cousin3.y - 35)
        } else {
            this.interactCousin3.setVisible(false);
        }

        this.isCousin3 = false; 

        if(this.isGrandparents) {
            this.interactGrandparents.setVisible(true);
            this.interactGrandparents.setPosition(this.grandparents.x + 45, this.grandparents.y - 45)
        } else {
            this.interactGrandparents.setVisible(false);
            
        }

        this.isGrandparents = false; 
        
        
        
        //if interact and start conversation then show text
        if(isTalkingCousin4) {
            this.main.body.setVelocity(0);
            this.cousin4talk();
        } 
        if(isTalkingCousin3) {
            this.main.body.setVelocity(0);
            this.cousin3talk();
        } 

    }

    //typewriting texts
    typewriteText(text) {
        const length = text.length;
        let i = 0;
        this.typeFinish = false;
        this.time.addEvent({
            callback: () => {
                this.typing.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 0
        });
        this.typeFinish = true;
    }

    typewriteTextWrapped(text) {
	    const lines = this.typing.getWrappedText(text)
	    const wrappedText = lines.join('\n')

	    this.typewriteText(wrappedText)
    }

    //dialogue with cousin4
    cousin4talk() {
        this.back.setActive(true).setVisible(true);
        this.typing.setActive(true).setVisible(true);
        this.space.setActive(true).setVisible(true);
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('button');
                this.dialogue.text = this.typewriteTextWrapped(this.cousin4dialogue[this.dialogorder]);
                this.typing.text = '';  
                this.dialogorder += 1;
            if(this.dialogorder > this.cousin4dialogue.length) {
                this.back.setVisible(false);
                this.typing.setVisible(false);
                this.space.setVisible(false);
                this.dialogorder = 0;
                isTalkingCousin4 = false;
            }
        }
        this.hastalked = true;
        this.shadow.setVisible(true);
    }

    //dialogue with cousin3
    cousin3talk() {
        this.cousin3dialogue = ["cousin3:  Hello! This is a demonstration", "cousin4:  of the dialogue mechanism", "cousin4:  Go right side and found the stone", "cousin4:  and you will know what to do"];
        this.back.setActive(true).setVisible(true);
        this.dialogue.setActive(true).setVisible(true);
        this.space.setActive(true).setVisible(true);
        this.dialogue.text = this.cousin3dialogue[this.dialogorder];
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('button');
            this.dialogorder += 1;
            this.dialogue.text = this.cousin3dialogue[this.dialogorder];
            if(this.dialogorder > this.cousin3dialogue.length) {
                this.back.setVisible(false);
                this.dialogue.setVisible(false);
                this.space.setVisible(false);
                this.dialogorder = 0;
                isTalkingCousin3 = false;
            }
        }
    }
}