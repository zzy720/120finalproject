class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        this.typing = this.add.text(38, 120, '', creditConfig);
        this.credit = this.typewriteText(" Game Designer: Everyone \n Programming: Noah Jiang \n Puzzle Design: Zeyu Zhang \n Character Design: Bianca Hsieh \n Animatior: Bianca Hsieh & Zeyu Zhang \n Sound Design: Noah Jiang");
        this.time.delayedCall(12000, () => {
            this.scene.start('endScene');
        })

    }

    update() {

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