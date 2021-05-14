class Funeral extends Phaser.Scene{
    constructor() {
        super("funeralScene");
    }

    preload() {
        //load image

        //this.load.image('tony', './assets/character placementtt.png');
        this.load.spritesheet('tony_walk', './assets/character_walk_left.png', {
            frameWidth: 48,
            frameHeight: 85,
            startFrame: 0,
            endFrame: 4
        });
        this.load.image('rip', './assets/stone.png');
        this.load.image('slime', './assets/slime.png');
        //this.load.image('background', './assets/map.png');
    }

    create() {
        this.dialogorder = 0; //dialogue counter

        /* this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('tony_walk',{
                start: 2,
                end:4,
                first: 0
            }),
            frameRate: 14,
        }); */

        //player input definition
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        //set world boundary
        this.physics.world.setBounds(0, 0, 5000, game.config.height);
        
        //tomb object 
        this.tomb = this.physics.add.sprite(1000, 480, 'rip');
        this.tomb.body.setCollideWorldBounds(true);

        //slime NPC
        this.slime = this.physics.add.sprite(200, 450, 'slime');
        this.slime.body.setCollideWorldBounds(true);
        this.isSlime = false;

        //main character
        this.main = new Tony(this, 100, 480, 'tony_walk', 0).setOrigin(0, 0);
        this.physics.add.existing(this.main); //add physics
        this.main.body.setCollideWorldBounds(true); //do not go out of the world
        this.main.body.onWorldBounds = true;

        //if touches the ground then you can jump, cannot jump mid-air
        this.physics.world.on('worldbounds', () => {
            isJump = false;
        });

        //interact text
        this.interact = this.add.text(1000, 370, "press E to interact", scoreConfig);
        this.interactSlime = this.add.text(200, 370, "press E to interact", scoreConfig);
        this.inter = false;

        //dialogue box config
        this.back = this.add.rectangle(0, 320, 640, 160, 0xff6699).setOrigin(0, 0);
        this.dialogue = this.add.text(40, 360, null, scoreConfig);
        this.space = this.add.text(40, 440, "Press S to continue", scoreConfig);

        //set to invisible when not activated
        this.back.setActive(false).setVisible(false);
        this.dialogue.setActive(false).setVisible(false);
        this.space.setActive(false).setVisible(false);

        //set interaction
        this.physics.add.overlap(this.main, this.tomb, () => {
            this.inter = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                this.scene.start('puzzleScene');
            }
        });

        //set interaction
        this.physics.add.overlap(this.main, this.slime, () => {
            this.isSlime = true;
            if(Phaser.Input.Keyboard.JustDown(keyE)) {
                isTalking = true;
            }
        });

        //camera setting
        this.cameras.main.setBounds(0, 0, 5000, game.config.height); //world bound
        this.cameras.main.startFollow(this.main, false, 1, 1, 0, 155); //follow the main character
        
    }

    update() {

        this.main.update();

        /*
        if(isRight) {
            this.main.anims.play('right');
        }
        */

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
            this.slimetalk();
        } 

    }

    //dialogue with slime
    slimetalk() {
        this.slimedialogue = ["Slime:  Hello! This is a demonstration", "Slime:  for the dialogue mechanism", "Slime:  Go right side and found the stone", "Slime:  and you will know what to do"];
        this.back.setActive(true).setVisible(true);
        this.dialogue.setActive(true).setVisible(true);
        this.space.setActive(true).setVisible(true);
        this.dialogue.text = this.slimedialogue[this.dialogorder];
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.dialogorder += 1;
            this.dialogue.text = this.slimedialogue[this.dialogorder];
            if(this.dialogorder > this.slimedialogue.length) {
                console.log("ei");
                this.back.setVisible(false);
                this.dialogue.setVisible(false);
                this.space.setVisible(false);
                this.dialogorder = 0;
                isTalking = false;
            }
        }
    }
}