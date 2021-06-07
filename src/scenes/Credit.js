class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        //background layer
        this.background = this.add.sprite(0, 0, 'FuneralBack').setOrigin(0, 0);
        this.rain = this.add.sprite(0, 0, 'rain').setOrigin(0, 0); //rain animation layer
        this.tomb = this.add.sprite(1400, 419, 'rip');
        this.rain2 = this.add.sprite(0, 0, 'rain').setOrigin(0, 0); //rain animation layer
        this.physics.world.setBounds(0, 0, 1500, game.config.height);

        this.typing = this.add.text(898, 120, '', creditConfig);
        this.credit = this.typewriteText(" Game Designer: Everyone \n Programming: Noah Jiang \n Puzzle Design: Zeyu Zhang \n Character Design: Bianca Hsieh \n Animatior: Bianca Hsieh & Zeyu Zhang \n Sound Design: Noah Jiang");
        this.time.delayedCall(12000, () => {
            this.scene.start('endScene');
        })

        //camera follow
        this.holder = this.physics.add.sprite(860, 0, 'holder').setOrigin(0, 0);
        this.holder.body.setCollideWorldBounds(true); //do not go out of the world
        this.holder.alpha = 0;


        //camera setting
        this.cameras.main.setBounds(0, 0, 1500, game.config.height); //world bound
        this.cameras.main.startFollow(this.holder, false, 1, 1, -320, 0); //follow the main character
    }

    update() {
        this.rain.anims.play('raindrop', true);
        this.rain2.anims.play('raindrop', true);
    }

    //typewriting texts
    typewriteText(text) {
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                this.typing.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 50
        });
    }

    typewriteTextWrapped(text) {
        const lines = this.typing.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(wrappedText)
    }
}