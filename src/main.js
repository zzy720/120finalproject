// game configuration
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    scene: [ Menu, Funeral, Puzzle1, Puzzle2 ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

//globalized text font
let scoreConfig = {
    fontFamily: 'Pixel',
    fontSize: '21px',
    //backgroundColor: '#2f4673',
    color: '#6b97bb',
    align: 'right',
    fixedWidth: 0
};


//reserve key inputs
let keyA, keyD, keyE, keyS, keySPACE;
let keyF; //cheat code

//moving status
let isLeft, isRight, isJump, isStop = false;
let isRunningLeft, isRunningRight = false;

//talking status
let isTalkingCousin3, isTalkingCousin4, isTalkingGrandparents, isTalkingFather = false;


let map;
let layer,bglayer;
let tiles;
let controls;
