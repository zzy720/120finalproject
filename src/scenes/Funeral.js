class Funeral extends Phaser.Scene{
    constructor() {
        super("funeralScene");
    }

    preload() {
        //load image

        this.load.spritesheet('walk_left', './assets/L_Walk.png', {
            frameWidth: 30,
            frameHeight: 64
        });
        this.load.spritesheet('walk_right', './assets/R_Walk.png', {
            frameWidth: 30,
            frameHeight: 64
        });
        this.load.spritesheet('jump_left', './assets/L_Jump.png', {
            frameWidth: 30,
            frameHeight: 64
        });
        this.load.spritesheet('jump_right', './assets/R_Jump.png', {
            frameWidth: 30,
            frameHeight: 64
        });

        this.load.image('rip', './assets/stone.png');
        this.load.image('slime', './assets/slime.png');
        this.load.image('dialog', './assets/images/dialog.png');
        this.load.image('FuneralBack', './assets/Funeral.png');
    }

    create() {
        this.hastalked = false; //talked to slime or not
        this.dialogorder = 0; //dialogue counter

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
            key:'leftjump',
            frames: this.anims.generateFrameNumbers('jump_left'),
            frameRate: 8
        }); 
        this.anims.create({
            key: 'rightjump',
            frames: this.anims.generateFrameNumbers('jump_right'),
            frameRate: 8
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
        this.tomb = this.physics.add.sprite(300, 480, 'rip');
        this.tomb.body.setCollideWorldBounds(true);

        //slime NPC
        this.slime = this.physics.add.sprite(200, 450, 'slime');
        this.slime.body.setCollideWorldBounds(true);
        this.isSlime = false;

        //main character
        this.main = new Tony(this, 100, 400, "walk_right", 0, 100).setOrigin(0, 0);
        this.physics.add.existing(this.main);
        this.main.body.setCollideWorldBounds(true); //do not go out of the world
        this.main.body.onWorldBounds = true;

        //if touches the ground then you can jump, cannot jump mid-air
        /*
        this.physics.world.on('worldbounds', () => {
            isJump = false;
        });*/

        //interact text
        this.interact = this.add.text(300, 370, "press E to interact", scoreConfig);
        this.interactSlime = this.add.text(200, 370, "press E to interact", scoreConfig);
        this.inter = false;

        //dialogue box config
        this.back = this.add.sprite(0, 319, 'dialog').setOrigin(0, 0);
        this.dialogue = this.add.text(40, 360, null, scoreConfig);
        this.space = this.add.text(40, 440, "Press S to continue", scoreConfig);

        //set to invisible when not activated
        this.back.setActive(false).setVisible(false);
        this.dialogue.setActive(false).setVisible(false);
        this.space.setActive(false).setVisible(false);

        //set interaction
        this.physics.add.overlap(this.main, this.tomb, () => {
            this.inter = true; //show instruction
            if(Phaser.Input.Keyboard.JustDown(keyE)){ //if player input
                if(this.hastalked) { //if talked to slime
                    this.sound.play('button');
                    this.scene.start('puzzle1Scene');
                } else {
                    this.warn = this.add.text(300, 330, "why are you ignoring the slime?", scoreConfig);
                }
            } 
        });

        //set interaction
        this.physics.add.overlap(this.main, this.slime, () => {
            this.isSlime = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.sound.play('button');
                isTalking = true;
            }
        });

        //camera setting
        this.cameras.main.setBounds(0, 0, 1500, game.config.height); //world bound
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155); //follow the main character
        
    }

    update() {
        isJump = true;
        this.main.update();

        
        if(isRight) {
            this.main.anims.play('rightwalk', true);
        }
        if (isLeft) {
            this.main.anims.play('leftwalk', true);
        }
        

        //if overlap then show interaction text
        if(this.inter) {
            this.interact.alpha = 1;
        } else {
            this.interact.alpha = 0;
        }

        this.inter = false; 

        //if overlap then show interaction text
        if(this.isSlime) {
            this.interactSlime.alpha = 1;
        } else {
            this.interactSlime.alpha = 0;
        }

        this.isSlime = false; 

        //if interact and start conversation then show text
        if(isTalking) {
            this.main.body.setVelocity(0);
            this.slimetalk();
        } 

    }

    //dialogue with slime
    slimetalk() {
        this.slimedialogue = ["Slime:  Hello! This is a demonstration", "Slime:  of the dialogue mechanism", "Slime:  Go right side and found the stone", "Slime:  and you will know what to do"];
        this.back.setActive(true).setVisible(true);
        this.dialogue.setActive(true).setVisible(true);
        this.space.setActive(true).setVisible(true);
        this.dialogue.text = this.slimedialogue[this.dialogorder];
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('button');
            this.dialogorder += 1;
            this.dialogue.text = this.slimedialogue[this.dialogorder];
            if(this.dialogorder > this.slimedialogue.length) {
                this.back.setVisible(false);
                this.dialogue.setVisible(false);
                this.space.setVisible(false);
                this.dialogorder = 0;
                isTalking = false;
            }
        }
        this.hastalked = true;
    }
}