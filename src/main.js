/*
Collaborator Names: Noah Jiang, Zeyu Zhang, Bianca Hsieh. 

Game Title: 

Date Completed: 

Creative Tilt Justification:
*/


// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Funeral, Puzzle ],
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
    fontFamily: 'system-ui',
    fontSize: '21px',
    backgroundColor: '#2f4673',
    color: '#6b97bb',
    align: 'right',
    fixedWidth: 0
};

//reserve key inputs
let keyA, keyD, keyE, keySPACE;
//jumping status
let isJump = false;
