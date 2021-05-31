// game configuration
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    scene: [Menu, Funeral, Puzzle1, Puzzle2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

//globalized text font
let scoreConfig = {
    fontFamily: 'system-ui',
    fontSize: '21px',
    backgroundColor: '#2f4673',
    color: '#6b97bb',
    align: 'right',
    fixedWidth: 0
};


//reserve key inputs
let keyA, keyD, keyE, keyS, keySPACE;

//moving status
let isLeft, isRight, isJump, isStop = false;
let isRunningLeft, isRunningRight = false;

//talking status
let isTalking = false;


let map;
let layer,bglayer;
let tiles;
let controls;
