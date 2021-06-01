class Funeral extends Phaser.Scene{
    constructor() {
        super("funeralScene");
    }

    preload() {
        //load image

        //animation
        this.load.spritesheet('walk_left', './assets/L_Walk.png', {
            frameWidth: 48,
            frameHeight: 80
        });
        this.load.spritesheet('walk_right', './assets/R_Walk.png', {
            frameWidth: 48,
            frameHeight: 80
        });
        this.load.spritesheet('idle_right', './assets/L_Idle.png', {
            frameWidth: 48,
            frameHeight: 80
        });
        this.load.spritesheet('idle_left', './assets/R_Idle.png', {
            frameWidth: 48,
            frameHeight: 80
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
        this.load.spritesheet('grandma', './assets/Grandma.png', {
            frameWidth: 31,
            frameHeight: 74
        });
        this.load.spritesheet('grandpa', './assets/Grandpa.png', {
            frameWidth: 32,
            frameHeight: 87
        });

        

        this.load.image('rip', './assets/Grave.png');
        this.load.image('dialog', './assets/images/dialog.png');
        this.load.image('FuneralBack', './assets/Funeral-test.png');
    }

    create() {
        isRight = true; //initially facing right
        this.hastalked = false; //talked to cousin4 or not
        this.dialogorder = 0; //dialogue counter


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
            frames: this.anims.generateFrameNumbers('grandma'),
            frameRate: 4
        });
        this.anims.create({
            key: 'grandpaidle',
            frames: this.anims.generateFrameNumbers('grandpa'),
            frameRate: 4
        });




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
        this.tomb = this.physics.add.staticSprite(1400, 430, 'rip');
        this.interact = this.add.text(1480, 370, "press E to interact", scoreConfig);
        this.inter = false;

        this.tomb_sub = this.physics.add.staticSprite(1400, 430, 'rip');
        this.tomb_sub.alpha = 0;
        this.tomb_sub.body.setSize(120, 48);

        //grandma NPC
        this.grandma = this.physics.add.sprite(620, 450, 'grandma');
        this.grandma.body.setCollideWorldBounds(true);
        this.isGrandma = false;
        this.interactGrandma = this.add.text(620, 370, "press E to interact", scoreConfig);

        //cousin3 NPC
        this.cousin3 = this.physics.add.sprite(600, 450, 'cousin3');
        this.cousin3.body.setCollideWorldBounds(true);
        this.isCousin3 = false;
        this.interactCousin3 = this.add.text(600, 370, "press E to interact", scoreConfig);

        //cousin4 NPC
        this.cousin4 = this.physics.add.sprite(400, 450, 'cousin4');
        this.cousin4.body.setCollideWorldBounds(true);
        this.isCousin4 = false;
        this.interactCousin4 = this.add.text(400, 370, "press E to interact", scoreConfig);

        //main character
        this.main = new Tony(this, 100, 400, "walk_right", 0, 300).setOrigin(0, 0);
        this.physics.add.existing(this.main);
        this.main.body.setCollideWorldBounds(true); //do not go out of the world
        this.main.body.onWorldBounds = true;

        //dialogue box config
        this.back = this.add.sprite(0, 319, 'dialog');
        this.dialogue = this.add.text(40, 360, 'null', scoreConfig).setOrigin(0, 0);
        this.space = this.add.text(40, 440, "Press S to continue", scoreConfig);

        //set to invisible when not activated
        this.back.setActive(false).setVisible(false);
        this.dialogue.setActive(false).setVisible(false);
        this.space.setActive(false).setVisible(false);

        //set interaction
        this.physics.add.collider(this.main, this.tomb);
        this.physics.add.overlap(this.main, this.tomb_sub, () => {
            this.inter = true; //show instruction
            if(Phaser.Input.Keyboard.JustDown(keyE)){ //if player input
                if(this.hastalked) { //if talked to cousin4
                    this.sound.play('button');
                    this.scene.start('puzzle2Scene');
                } else {
                    this.warn = this.add.text(300, 330, "why are you ignoring the cousin4?", scoreConfig);
                }
            } 
        });

        //set interaction
        this.physics.add.overlap(this.main, this.cousin4, () => {
            this.isCousin4 = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.sound.play('button');
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
        

        //camera setting
        this.cameras.main.setBounds(0, 0, 1500, game.config.height); //world bound
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155); //follow the main character
        
    }

    update() {

        isJump = true;
        this.main.update();

        
        this.back.setPosition(this.main.x, this.main.y + 30);
        this.dialogue.setPosition(this.back.x - 60, this.back.y - 20);
        
        this.cousin3.anims.play('cousin3idle', true);
        this.cousin4.anims.play('cousin4idle', true);

        if(!isStop){
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

        

        //if overlap then show interaction text
        if(this.inter) {
            this.interact.alpha = 1;
        } else {
            this.interact.alpha = 0;
        }

        this.inter = false; 

        //if overlap then show interaction text
        if(this.isCousin4) {
            this.interactCousin4.alpha = 1;
        } else {
            this.interactCousin4.alpha = 0;
        }

        this.isCousin4 = false; 

        if(this.isCousin3) {
            this.interactCousin3.alpha = 1;
        } else {
            this.interactCousin3.alpha = 0;
        }

        this.isCousin3 = false; 

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

    //dialogue with cousin4
    cousin4talk() {
        this.cousin4dialogue = ["cousin4:  Hello! This is a demonstration", "cousin4:  of the dialogue mechanism", "cousin4:  Go right side and found the stone", "cousin4:  and you will know what to do"];
        this.back.setActive(true).setVisible(true);
        this.dialogue.setActive(true).setVisible(true);
        this.space.setActive(true).setVisible(true);
        this.dialogue.text = this.cousin4dialogue[this.dialogorder];
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('button');
            this.dialogorder += 1;
            this.dialogue.text = this.cousin4dialogue[this.dialogorder];
            if(this.dialogorder > this.cousin4dialogue.length) {
                this.back.setVisible(false);
                this.dialogue.setVisible(false);
                this.space.setVisible(false);
                this.dialogorder = 0;
                isTalkingCousin4 = false;
            }
        }
        this.hastalked = true;
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