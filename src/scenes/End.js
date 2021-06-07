class End extends Phaser.Scene {
    constructor() {
        super('endScene');
    }

    create() {
        this.typing = this.add.text(38, 120, '', endConfig);
        this.typewriteText("THE END");

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