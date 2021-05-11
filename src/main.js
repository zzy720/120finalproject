/*
Collaborator Names: Noah Jiang, Zeyu Zhang, Bianca Hsieh. Go to in-game credit scene to see
the work distribution and contribution.

Game Title: 

Date Completed: 5/11/2021

Creative Tilt Justification:
*/


// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Credit, Tutorial,Gameover ]
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
