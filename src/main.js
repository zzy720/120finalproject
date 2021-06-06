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
let isTalkingCousin1, isTalkingCousin2, isTalkingCousin3, isTalkingCousin4, 
    isTalkingGrandparents, isTalkingDad = false;


let map;
let layer,bglayer;
let tiles;
let controls;

let cousin1dialogue = ["Bianca:  I feel sorry for you Tony,", 
                       "Bianca:  everything is gonna be fine.", 
                       "Bianca:  Time will carry away the pain."];

let cousin2dialogue = ["Vicky:  Aunt Helena treated me so well,",
                       "Vicky:  but...",
                       "VIcky:  I'm sorry..."];

let cousin3dialogue = ["Jenny:  Don't cry brother!"];

let cousin4dialogue = ["Timmy:  Papa! It's raining!",
                       "Uncle:  Timmy! Be quiet! Behave yourself!",
                       "Uncle:  I'm sorry Tony, Timmy is still too young,",
                       "Uncle:  He can't quite understand the situation right now.",
                       "Tony:  It's alright uncle."];

let grandparentsdialogue = ["Grandma:  She was so adorable...",
                            "Grandpa:  Her life shouldn't end like this...",
                            "Grandma:  My honey...",
                            "Grandpa:  ...",
                            "Grandma:  You should go talk to your dad,",
                            "Grandma:  he must be so suffering..."];

let fatherdialoguebefore = ["Dad:  Helena..."];

let fatherdialogueafter = ["Dad:  I loved her so much,",
                           "Dad:  She will always be with us...", 
                           "Dad:  It's time to go home,", 
                           "Dad:  but before that...",
                           "Dad:  would you want to say goodbye to your mom?"];

